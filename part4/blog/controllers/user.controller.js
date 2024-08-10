import { hash } from 'bcrypt'
import { Router } from "express";
import User from '../models/user.model.js'

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    return response.status(400).send("Username and password are required");
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).send("Username and password must be at least 3 characters long");
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
    .populate('blogs')
  response.json(users);
})

userRouter.get('/:id', async (request, response) => {
  try {
    const userId = request.params.id;

    const user = await User.findById(userId).populate('blogs');

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  } catch (error) {
    console.error(error); // Log errors for debugging
    response.status(500).send({ error: 'Failed to fetch user' });
  }
});

export default userRouter
