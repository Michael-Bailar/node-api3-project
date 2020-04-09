const express = require('express');

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

const server = express();

//middleware
server.use(logger)
server.use(express.json())


server.use('/api/post', postRouter)
server.use('/api/users', userRouter)



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware


function logger(req, res, next) {
  const timestamp = new Date()
  console.log(`${req.method} Request to: ${req.originalUrl}, ${timestamp}`)
  next()
}

module.exports = server;

