import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import database from './db/connection'
import { test } from './routes/auth/sign-up'

async function bootstrap() {
  const app = fastify()
  const db = database()

  db.start()

  app.register(cors, { origin: ['localhost:3000'] })
  app.register(jwt, { secret: 'awkdifsadawdaojsdiojadadwadioawjd' })

  // routes
  app.register(test)

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
