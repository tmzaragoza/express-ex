const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('../lib/middleware/notFound');
const { handler } = require('../lib/middleware/error');



app.use((req, res, next) => {

  req.startAt = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - req.startAt;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${responseTime}ms`);
  });
  next();

});
app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use(notFound);
app.use(handler);

module.exports = app;
