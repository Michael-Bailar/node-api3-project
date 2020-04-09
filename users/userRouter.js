const express = require('express');

const Post = require('../posts/postDb.js')
const Users = require('./userDb.js')

const router = express.Router()

router.use('./:id', validateUserId)

router.post('/', validateUser, (req, res) => {
  console.log(req.body)
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "error adding data"
      })
    })
});


router.post('/:id/posts', validatePost, (req, res) => {
    const user_id = req.params.id
    const text = req.body.text
    const post = { text, user_id}
    Post.insert(post)
    .then(post => {
      res.status(201).json(post)
    })
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "The users information could not be retrieved."
      })
    })
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
});

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "The user posts could not be retrieved."
      })
    })
});

router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The user has been removed" })
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
      }
    })
});

router.put('/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body
  Users.update(id, changes)
    .then(user => {
        res.status(200).json(user)
    })
});

//custom middleware

function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(400).json({ message: "invalid user id" })
      }
    })
}

function validateUser(req, res, next) {
  const body = req.body

  if (!Object.keys(body).length) {
    res.status(400).json({message: "missing user data"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const body = req.body

  if (!Object.keys(body).length) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = router;
