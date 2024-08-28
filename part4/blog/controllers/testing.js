import { Router } from "express";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const resetRouter = Router()

resetRouter.post("/reset", async (_request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

export default resetRouter;
