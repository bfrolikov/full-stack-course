require('dotenv').config();
const mongoose = require('mongoose');
const superstest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
];

const api = superstest(app);


describe('Request testing', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blogObject => blogObject.save());
    await Promise.all(promiseArray);
  }, 15000);
  test('should return a correct number of blogs in json', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(initialBlogs.length);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
  });
  test('should create a blog', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    };
    await api
      .post('/api/blogs')
      .send(newBlog); // send a post request with a new blog
    const afterPost = await api.get('/api/blogs'); // get the blogs after that
    const resultingBlogs = afterPost.body.map((blog) => { // remove their id field
      let blogCopy = { ...blog };
      delete blogCopy.id;
      return blogCopy;
    });
    expect(resultingBlogs).toContainEqual(newBlog);
    expect(resultingBlogs.length).toBe(initialBlogs.length + 1);
  });
  test('should be able to delete a blog', async () => {
    const blogsAtStart = await Blog.find({});
    const firstBlog = blogsAtStart[0];
    await api.delete(`/api/blogs/${firstBlog.id}`);
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);
    expect(blogsAtEnd).not.toContainEqual(firstBlog);
  });
  test('should be able to update a blog', async () => {
    const blogsAtStart = await Blog.find({});
    const firstBlog = blogsAtStart[0];
    const newBlogParams = { url: 'http://test', likes: 50 };
    await api
      .put(`/api/blogs/${firstBlog.id}`)
      .send(newBlogParams);
    const blogsAtEnd = await Blog.find({});
    const updatedFirstBlog = blogsAtEnd[0];
    expect(updatedFirstBlog.url).toBe(newBlogParams.url);
    expect(updatedFirstBlog.likes).toBe(newBlogParams.likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
