import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import * as dotenv from 'dotenv'
import database from './db/connection'
import { Auth } from './routes/auth/auth'
import { User } from './routes/user'

export default function bootstrap() {
  dotenv.config()

  const app = fastify()
  const db = database()

  db.start()

  app.register(multipart)
  app.register(cors, { origin: ['http://localhost:3000'] })
  app.register(jwt, {
    secret: 'dawdanwkjdnajdnasjdnasdjawndjwandwjandwadnkawjdnjawdnwkaj',
  })

  // routes
  app.register(Auth)
  app.register(User)

  return app
}
