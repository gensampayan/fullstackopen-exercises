import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Blog from '../models/blog';
import app from '../app';
import supertest from 'supertest';
import assert from 'assert';
import { blogsInDb } from './test_helper';
const api = supertest(app);

describe('when there is initially one user in db', () => {
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const passwordHash = await hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    const savedUser = await user.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };

    token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
      title: 'Initial Blog',
      author: 'Author Name',
      url: 'http://example.com',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Another Blog',
      author: 'Another Author',
      url: 'http://example2.com',
      likes: 10,
    };

    const blogsAtStart = await helper.blogsInDb();

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

    const titles = blogsAtEnd.map(b => b.title);
    assert(titles.includes(newBlog.title));
  });

  test('adding a blog fails with status 401 if no token is provided', async () => {
    const newBlog = {
      title: 'Blog without Token',
      author: 'Author Name',
      url: 'http://example3.com',
      likes: 2,
    };

    const blogsAtStart = await helper.blogsInDb();

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  });
});
