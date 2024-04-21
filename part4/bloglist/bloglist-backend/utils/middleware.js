const morgan = require('morgan')
const logger = require('./logger')

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
  logger.error(`ERROR: ${error.name}: ${error.message}`)

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

module.exports = { requestLogger, unkownEndpointHandler, errorHandler }