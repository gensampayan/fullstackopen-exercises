import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

const initialBlogs = [
  {
      "title": "Understanding JavaScript",
      "author": "Jane Doe",
      "url": "https://example.com/understanding-javascript",
      "likes": 120,
      "id": "66af476fb5ee35c06e2437f9"
  },
  {
      "title": "Understanding JavaScriptS",
      "author": "Jane DoeS",
      "url": "https://example.com/understanding-javascriptS",
      "likes": 1,
      "id": "66af47c9b5ee35c06e2437fb"
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

export {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}
