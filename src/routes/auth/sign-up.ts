import { z } from 'zod'
import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { userModel } from '../../models/user'

export async function test(app: FastifyInstance) {
  app.post('/signup', async (req, res) => {
    const bodySchema = z
      .object({
        name: z.string().min(2, 'name too short'),
        username: z.string().min(2, 'name too short'),
        profile_photo: z.string(),
        email: z.string().email(),
        samePassword: z.string().min(5, 'password too short'),
        password: z.string().min(5, 'password too short'),
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
      profile_photo: userParsed.profile_photo,
      email: userParsed.email,
      password: hashPassword,
    })

    return res.status(200).send({ message: 'user created successfully' })
  })
}
