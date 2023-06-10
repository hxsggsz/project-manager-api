import { z } from 'zod'
import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { userModel } from '../../models/user'
import axios from 'axios'

export async function Auth(app: FastifyInstance) {
  app.post('/signup', async (req, res) => {
    const bodySchema = z
      .object({
        name: z.string().min(2, 'name too short'),
        username: z
          .string()
          .min(2, 'username too short')
          .max(30, 'username too long'),
        email: z.string().email(),
        password: z.string().min(5, 'password too short'),
        samePassword: z.string().min(5, 'password too short'),
      })
      .refine((data) => data.password === data.samePassword, {
        message: 'Password not the same',
      })

    const userParsed = bodySchema.parse(req.body)
    let user = await userModel.findOne({ email: userParsed.email })

    if (user) {
      return res.status(400).send({ message: 'email already exists' })
    }

    const checkUsername = await userModel.findOne({
      username: userParsed.username,
    })

    if (checkUsername) {
      return res.status(400).send({ message: 'username already in use' })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(userParsed.password, salt)

    user = await userModel.create({
      name: userParsed.name,
      username: userParsed.username,
      email: userParsed.email,
      password: hashPassword,
    })

    return res.status(201).send({ message: 'user created successfully' })
  })

  app.post('/login', async (req, res) => {
    const bodySchema = z.object({
      email: z.string().email('it must be a valid email').nonempty(),
      password: z.string().nonempty(),
    })
    const loginParsed = bodySchema.parse(req.body)

    const findUser = await userModel.findOne({
      email: loginParsed.email,
    })

    if (!findUser) {
      return res
        .status(400)
        .send({ message: 'there is no account with this email' })
    }

    const comparePassword = await bcrypt.compare(
      loginParsed.password,
      findUser.password,
    )

    if (!comparePassword) {
      return res
        .status(400)
        .send({ message: 'there is no account with this password' })
    }

    const token = app.jwt.sign(
      {
        name: findUser.name,
        username: findUser.username,
        profile_photo: findUser.profile_photo,
      },
      {
        sub: findUser.id,
        expiresIn: '30 days',
      },
    )

    return res.status(200).send({ token })
  })

  app.post('/github', async (req, reply) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(req.body)

    const accessTokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const userSchema = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await userModel.findOne({ githubId: userInfo.id })

    if (!user) {
      user = await userModel.create({
        githubId: userInfo.id,
        name: userInfo.name,
        username: userInfo.login,
        profile_photo: userInfo.avatar_url,
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        username: user.username,
        profile_photo: user.profile_photo,
      },
      {
        sub: user.id,
        expiresIn: '30 days',
      },
    )

    return reply.status(200).send({ token })
  })

  app.post('/linkedin', async (req, reply) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(req.body)

    const responseToken = z.object({
      access_token: z.string(),
      expires_in: z.number(),
    })

    type ResponseTokenType = z.infer<typeof responseToken>

    const getAcessToken = await axios.post<ResponseTokenType>(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          code,
          grant_type: 'authorization_code',
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
          redirect_uri: 'http://localhost:3000/api/auth/linkedin',
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )
    const { access_token, expires_in: expiresIn } = getAcessToken.data

    const userResponse = await axios.get(
      'https://api.linkedin.com/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )

    const userSchema = z.object({
      sub: z.string(),
      name: z.string(),
      email: z.string().email(),
      picture: z.string().url(),
    })

    const userInfo = userSchema.parse(userResponse.data)

    let user = await userModel.findOne({ linkedinId: userInfo.sub })

    if (!user) {
      user = await userModel.create({
        linkedinId: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        username: userInfo.name,
        profile_photo: userInfo.picture,
      })
    }

    const token = app.jwt.sign(
      {
        name: user.name,
        username: user.username,
        profile_photo: user.profile_photo,
      },
      {
        sub: user.id,
        expiresIn,
      },
    )

    return reply.status(200).send({ token })
  })
}
