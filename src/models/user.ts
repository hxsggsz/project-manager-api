import mongoose from 'mongoose'

const { Schema } = mongoose

interface IUser {
  name: string
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
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profile_photo: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const userModel = mongoose.model('User', UserSchema)
