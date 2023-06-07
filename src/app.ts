import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import * as dotenv from 'dotenv'
import database from './db/connection'
import { Auth } from './routes/auth/auth'

export default function bootstrap() {
  dotenv.config()

  const app = fastify()
  const db = database()

  db.start()

  app.register(cors, { origin: ['localhost:3000'] })
  app.register(jwt, { secret: process.env.SECURITY_JWT!.toString() })

  // routes
  app.register(Auth)

  return app
}
