import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: {
    type: String,
    maxlength: 3
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = model('User', userSchema)

export default User
