import { test, after, beforeEach, describe } from 'node:test';
import { strictEqual } from 'node:assert';
import Blog from '../models/blog.model.js';
import { initialBlogs, nonExistingId, blogsInDb } from './test_helper.js';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
const api = supertest(app);

describe("blog api test", () => {
  beforeEach( async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  })
  
  test('returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
      
    strictEqual(response.body.length, initialBlogs.length);
  })
  
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;
  
    blogs.forEach(blog => {
      strictEqual(blog.id !== undefined, true);
    });
  })
  
  test('verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
    const newBlog = {
      "title": "Unit Test",
      "author": "Jane Mark",
      "url": "https://example.com/unit-test",
      "likes": 99
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await blogsInDb();
    strictEqual(blogAtEnd.length, initialBlogs.length + 1);
  })
  
  test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: "Unit Test",
      author: "Jane Mark",
      url: "https://example.com/unit-test"
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      strictEqual(response.body.likes, 0);
  })
  
  test('verify that if the title or url properties are missing from the request data', async () => {
    const newBlog = {
      "author": "Jane Mark",
      "url": "https://example.com/unit-test",
      "likes": 99
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogAtEnd = await blogsInDb();
    strictEqual(blogAtEnd.length, initialBlogs.length);
  })
  
  test(`success deletion if id is valid`, async () => {
    const blogData = await Blog.find({});
    const blogToDelete = blogData[0];
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);
  
    const blogAtEnd = await blogsInDb();
    strictEqual(blogAtEnd.length, initialBlogs.length - 1);
  });
  
  test.only(`success updated if id is valid`, async () => {
    const blogData = await Blog.find({});
    const blogToUpdate = blogData[0];
  
    const updatedBlog = {
      "title": "Unit Tests",
      "author": "Jane Marks",
      "url": "https://example.com/unit-tests",
      "likes": 50
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogAtEnd = await blogsInDb();
    strictEqual(blogAtEnd.length, initialBlogs.length);
  });
})

after(async () => {
  await mongoose.connection.close();
})
