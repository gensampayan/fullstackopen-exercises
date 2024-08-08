import { hash } from 'bcrypt'
import { Router } from "express";
import User from '../models/user.model.js'

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username.length !== 3 && password.length !== 3) {
    return response.status(400).send("input must be 3 or more letters")
  }

  const saltRounds = 10
  const passwordHash = await hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.json(users);
})

export default userRouter
