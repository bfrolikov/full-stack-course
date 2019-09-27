const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
  const { body, token } = request;
  if (!token)
    return response.status(401).json({ error: 'token missing or invalid' });
  try {
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' });

    const userCreator = await User.findById(decodedToken.id);
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: userCreator._id
    });
    const savedBlog = await blog.save();
    userCreator.blogs = userCreator.blogs.concat(savedBlog._id);
    await userCreator.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const { body } = request;
  const updateParams = {
    likes: body.likes,
    url: body.url
  };
  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, updateParams, { new: true });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
