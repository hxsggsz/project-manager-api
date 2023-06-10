import mongoose from 'mongoose'

const { Schema } = mongoose

interface IUser {
  name: string
  githubId?: number
  username: string
  profile_photo: string
  email: string
  password: string
}

export const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    githubId: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profile_photo: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true },
)

export const userModel = mongoose.model('User', UserSchema)
