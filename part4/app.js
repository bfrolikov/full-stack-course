const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(() => {
  // console.log('connected to mongodb');
});


app.use(cors());
app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
module.exports = app;
