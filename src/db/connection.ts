import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

export default async function main() {
  dotenv.config()

  try {
    await mongoose.connect(
      `mongodb+srv://hxsggsz:${process.env.DATABASE_URL}@cluster0.qhvrluy.mongodb.net/brello_DB?retryWrites=true&w=majority`,
    )
    console.log('[database]: Connected successfully')
  } catch (error) {
    console.log(`[database]: connection failed: ${error}`)
  }
}
