const express = require('express');

const Post = require('./postDb.js')

const router = express.Router();

router.get('/', (req, res) => {
  Post.get(req.query)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
        message: "The post information could not be retrieved."
    })
  })
});

router.get('/:id', (req, res) => {
  Post.getById(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
        message: "The post information could not be retrieved."
    })
  })
});

router.delete('/:id', (req, res) => {
  Post.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: "The post has been removed"})
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist"})
    }
  })
});

router.put('/:id', (req, res) => {

  const id = req.params.id
  const changes =  req.body
  Post.update(id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).json({message: "post not found"})
    }
  })

});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
