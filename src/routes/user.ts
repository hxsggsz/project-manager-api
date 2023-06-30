import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { userModel } from '../models/user'

export async function User(app: FastifyInstance) {
  app.put('/user/:id', async (req, reply) => {
    const bodySchema = z.object({
      name: z.string().min(2, 'name too short').max(15, 'name too long'),
      username: z.string().max(30, 'username too long'),
      profile_photo: z.string().url('invalid url'),
    })

    const paramsSchema = z.object({
      id: z.string(),
    })

    const bodyParsed = bodySchema.parse(req.body)
    const paramsParsed = paramsSchema.parse(req.params)
    const user = await userModel.findByIdAndUpdate(paramsParsed.id, bodyParsed)
    if (!user) {
      return reply.status(404).send({ message: 'user not found' })
    }
    return reply.status(200).send({ message: 'user updated successfuly' })
  })
}
