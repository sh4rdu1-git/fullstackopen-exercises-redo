const Blog = require('../models/blog')
const blogRouter = require('express').Router()

// ---------------------------------------------------
//                 DEFINE API ROUTES
// ---------------------------------------------------
// Get info about blogs
blogRouter
  .get('/info', (req, res, next) => {
    Blog
      .countDocuments({})
      .then(blogCount => {
        res.status(200).send(`
    <h1>Blog List</h1>
    <p>Currently, there are ${blogCount} blogs saved.</p>
    <p>${new Date()}</p>
    `)
      })
      .catch(error => {
        next(error)
      })
  })

// Get all blogs
blogRouter
  .get('/', (req, res, next) => {
    Blog
      .find({})
      .then(blogs => {
        res.status(200).send(blogs)
      })
      .catch(error => {
        next(error)
      })
  })

// Get blog by ID
blogRouter
  .get('/:id', (req, res, next) => {
    const blogId = req.params.id

    Blog
      .findById(blogId)
      .then(blog => {
        if (!blog) {
          return res.status(404).send({
            httpStatus: 404,
            error: 'Requested blog not found'
          })
        }
        res.status(200).send(blog)
      })
      .catch(error => {
        next(error)
      })
  })

// Create a new blog
blogRouter
  .post('/', (req, res, next) => {
    const blog = new Blog(req.body)

    blog
      .save()
      .then(result => {
        res.status(201).send(result)
      })
      .catch(error => {
        next(error)
      })
  })

module.exports = blogRouter