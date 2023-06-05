import fastify from 'fastify'
import main from './db/connection'

async function bootstrap() {
  const app = fastify()
  main()

  app.get('/', () => {
    return 'test'
  })

  app
    .listen({
      port: 8080,
    })
    .then(() =>
      console.log('[server]: listening on port http://localhost:8080'),
    )
}

bootstrap()
