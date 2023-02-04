const { IOError } = require('./error')

const logError = (log, message, exception) => {
  const ioError = new IOError(exception.message || message, {
    statusCode: exception.statusCode,
    origError: exception
  })
  log.error(`An unexpected error occurred: ${ioError.message}`, ioError)
  throw ioError
}

const mongooseErrorHandler = (error, reply) => {
  const { name: errorName, statusCode } = error
  switch (errorName) {
    case 'ValidationError':
      reply = {
        statusCode: 400,
        message: error.message
      }
      break
    case 'IOError':
      reply = {
        statusCode: error.statusCode,
        message: error.message
      }
      break
    case 'MongoServerError':
      if (error.code === 11000) {
        const keys = [...Object.keys(error.keyPattern)]
        reply = {
          statusCode: 409,
          message: `Duplicate key error : ${keys}`
        }
      }
      break
    default:
      reply = { statusCode: statusCode || 500, message: error.message }
      break
  }
  return reply
}

module.exports = {
  mongooseErrorHandler,
  logError
}
