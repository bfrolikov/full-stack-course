const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response, next) => {
  try {
    const receivedUser = request.body;
    const userInDb = await User.findOne({ username: receivedUser.username });
    const credentialsCorrect = userInDb === null
      ? false
      : await bcrypt.compare(receivedUser.password, userInDb.passwordHash);
    if (!(userInDb && credentialsCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      });
    }
    const userForToken = {
      username: userInDb.username,
      id: userInDb._id
    };
    const token = jwt.sign(userForToken, config.SECRET);
    response
      .status(200)
      .send({ token, username: userInDb.username, name: userInDb.name });
  } catch (error) {
    next(error);
  }
})

module.exports = loginRouter;
