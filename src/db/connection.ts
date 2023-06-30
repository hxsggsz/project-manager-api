import mongoose from 'mongoose'

export default function database() {
  async function start() {
    try {
      await mongoose.connect(process.env!.DATABASE_URL!)

      console.log('[database]: Connected successfully')
    } catch (error) {
      console.log(`[database]: connection failed: ${error}`)
    }
  }

  return { start }
}
