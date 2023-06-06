import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import database from './db/connection'
import { SignUp } from './routes/auth/sign-up'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = fastify()
  const db = database()

  db.start()

  app.register(cors, { origin: ['localhost:3000'] })
  app.register(jwt, { secret: process.env.SECURITY_JWT!.toString() })

  // routes
  app.register(SignUp)

  const port = 8080
  app
    .listen({
      port,
    })
    .then(() =>
      console.log(`[server]: listening on port http://localhost:${port}`),
    )
}

bootstrap()
