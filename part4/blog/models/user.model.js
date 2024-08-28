import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    minlength: 3
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)
export default User
