import { z } from 'zod'
import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { userModel } from '../../models/user'

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

    const findEmail = await userModel.findOne({
      email: loginParsed.email,
    })

    if (!findEmail) {
      return res
        .status(400)
        .send({ message: 'there is no account with this email' })
    }

    const comparePassword = await bcrypt.compare(
      loginParsed.password,
      findEmail.password,
    )

    if (!comparePassword) {
      return res
        .status(400)
        .send({ message: 'there is no account with this password' })
    }

    // todo: create a token with the basic information about the user and return it
    return res.status(200).send({ findEmail })
  })
}
