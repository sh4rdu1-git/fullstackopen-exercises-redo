const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')


// ---------------------------------------------------
//                 MOGODB SETUP
// ---------------------------------------------------
logger.info(`Trying connection to MongoDB: ${config.MONGODB_URI}`)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error(`Error connecting to MongoDB: ${error.message}`)
  })

// ---------------------------------------------------
//                 LOADING MIDDLEWARES
// ---------------------------------------------------
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger())
app.use('/api/blogs', blogRouter)



// ---------------------------------------------------
//            MIDDLEWARES LOADED AT LAST
// ---------------------------------------------------
app.use(middleware.unkownEndpointHandler)
app.use(middleware.errorHandler)


module.exports = app