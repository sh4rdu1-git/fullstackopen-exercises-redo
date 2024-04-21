const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// ---------------------------------------------------
//                 SERVER STARTER CODE
// ---------------------------------------------------
app.listen(config.PORT, () => {
  logger.info(`---------------------------------------------------
Blog List backend server running on port ${config.PORT}
Start time: ${new Date()}
---------------------------------------------------`)
})