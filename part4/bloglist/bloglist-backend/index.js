require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()


// ---------------------------------------------------
//          HELPER MIDDLEWARES DEFINITION
// ---------------------------------------------------
const requestLogger = () => {
  morgan.token('reqBody', (req) => {
    return JSON.stringify(req.body)
  })
  return morgan('[:date[clf]] :method - :url - HTTPStatus=:status - Response-size=:res[content-length] - Response-time=:response-time ms - ClientIP=:remote-addr - Referrer=:referrer - ReqBody=:reqBody')
}

const unkownEndpointHandler = (req, res) => {
  return res.status(404).send({
    httpStatus: 404,
    error: 'Unknown endpoint'
  })
}

const errorHandler = (error, req, res, next) => {
  console.error(`ERROR: ${error.message}`)

  switch(error.name) {
  case 'CastError': {
    return res.status(400).send({
      httpStatus: 400,
      error: 'Malformatted ID'
    })
  }
  case 'ValidationError': {
    return res.status(400).send({
      httpStatus: 400,
      error: error.message
    })
  }
  }

  next(error)
}


// ---------------------------------------------------
//                 MOGODB SETUP
// ---------------------------------------------------
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

console.log(`Trying connection to MongoDB: ${process.env.MONGODB_URI}`)
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.error(`Error connecting to MongoDB: ${error.message}`)
})


// ---------------------------------------------------
//                 LOADING MIDDLEWARES
// ---------------------------------------------------
app.use(cors())
app.use(express.json())
app.use(requestLogger())


// ---------------------------------------------------
//                 DEFINE API ROUTES
// ---------------------------------------------------
// Get all blogs
app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.status(200).send(blogs)
    })
})

// Create a new blog
app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).send(result)
    })
})


// ---------------------------------------------------
//            MIDDLEWARES LOADED AT LAST
// ---------------------------------------------------
app.use(unkownEndpointHandler)
app.use(errorHandler)


// ---------------------------------------------------
//                 SERVER STARTER CODE
// ---------------------------------------------------
app.listen(process.env.PORT, () => {
  console.log(`---------------------------------------------------
Blog List backend server running on port ${process.env.PORT}
Start time: ${new Date()}
---------------------------------------------------`)
})