module.exports = ({ log }) => {
  const { OtpModel } = require('../models/otp.model')
  return {
    findOne: async (query) => {
      try {
        return await OtpModel.findOne(query)
      } catch (exception) {
        log.error('An unxpected error occurred while accessing findOne dao', mongooseErrorHandler(exception, {})
        )
      }
    },
    create: async (query) => {
      try {
        return await OtpModel.create(query)
      } catch (exception) {
        log.error(log, 'An unxpected error occurred while accessing create dao', mongooseErrorHandler(exception, {})
        )
      }
    },
  }
}
