import bootstrap from './app'

const app = bootstrap()

const port = 8080
app
  .listen({
    port,
  })
  .then(() =>
    console.log(`[server]: listening on port http://localhost:${port}`),
  )
