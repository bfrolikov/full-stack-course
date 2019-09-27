const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');


userRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const passwordHash = await bcrypt.hash(body.password, 10); // 10 is the number of salt rounds
    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });
    const savedUser = await newUser.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  response.json(users);
});

module.exports = userRouter;
