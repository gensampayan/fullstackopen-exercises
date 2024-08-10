import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Router } from "express";
import User from '../models/user.model.js';

const loginRouter = Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter;
