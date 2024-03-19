const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const personRouter = require('./controllers/persons')

// Setup connection to MongoDB
mongoose.set('strictQuery', false)
logger.info(`Trying connection to ${config.MONGODB_URI}`)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error(`Failed to connect MongoDB: ${error.message}`)
  })

// CORS middleware
app.use(cors())

// Serve static frontend files from 'dist' directory
app.use(express.static('dist'))

// Express JSON Parser
app.use(express.json())

// Request Logger middleware
app.use(middleware.requestLogger())

// API router
app.use('/api/persons', personRouter)

// Unknown endpoint handler middleware
app.use(middleware.unknownEndpoint)

// Error handler middleware
// This middleware should be always loaded at the last
// All routes should be defined before loading this middleware
app.use(middleware.errorHandler)

module.exports = app