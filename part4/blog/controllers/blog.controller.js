import { Router } from "express";
import Blog from "../models/blog.model.js";

const blogRouter = Router();

blogRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', 'username name _id');
    response.json(blogs);
  } catch (error) {
    response.status(500).send({ error: 'Failed to fetch blogs' });
  }
});

blogRouter.post('/', async (request, response) => {
  let user;
  try {
    user = request.user;
    if (!user) {
      return response.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    return response.status(500).send({ error: 'Failed to retrieve user' });
  }

  const { title, url, author, likes } = request.body;

  if (!title) {
    return response.status(400).send({ error: 'Title is missing' });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => {
      response.status(500).send({ error: 'Failed to save blog' });
    });
});

blogRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id;
  const { title, url, author, likes } = request.body;

  const updatedBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const blog = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true });

  if (!blog) {
    return response.status(400).send("Blog with the given ID was not found.");
  }

  response.status(200).json(blog);
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id;
  const userId = request.user._id;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    return response.status(404).send({ error: 'Blog with the given ID was not found.' });
  }

  if (blog.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'Unauthorized to delete this blog' });
  }

  try {
    await Blog.findByIdAndDelete(blogId);
    response.status(204).end();
  } catch (error) {
    response.status(500).send({ error: 'Failed to delete blog' });
  }
});

export default blogRouter;
