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
  const message = process.env.MESSAGE || "Hello from localhost"
  res.status(200).json({ api: "up", message });
});

//custom middleware


function logger(req, res, next) {
  const timestamp = new Date()
  console.log(`${req.method} Request to: ${req.originalUrl}, ${timestamp}`)
  next()
}

module.exports = server;

