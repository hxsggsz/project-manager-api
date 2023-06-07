import mongoose from 'mongoose'

export default function database() {
  async function start() {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_URL}@cluster0.qhvrluy.mongodb.net/${process.env.DATABASE_NAME}`,
      )
      // ?retryWrites=true&w=majority
      console.log('[database]: Connected successfully')
    } catch (error) {
      console.log(`[database]: connection failed: ${error}`)
    }
  }

  return { start }
}
