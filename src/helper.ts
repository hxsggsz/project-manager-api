import Fastify from 'fastify'
import fp from 'fastify-plugin'
import bootstrap from './app'

export function build() {
  const app = Fastify()

  beforeAll(async () => {
    // eslint-disable-next-line no-void
    app.register(fp(bootstrap))
    await app.ready()
  })

  afterAll(() => app.close())

  return app
}
