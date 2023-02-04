module.exports = (fastify) => {
  const { UserModel } = require('../models/user.model')
  const playerDao = require("../dao/player.dao")(fastify)
  const otpDao = require("../dao/otp.dao")(fastify)
  const { mongooseErrorHandler } = require('../utils/db.error.handler')
  const { IOError } = require('../utils/error')
  return {
    playerAuthentication: async (payload) => {
      let user
      let data
      try {
        const { mobile } = payload
        user = await playerDao.findOne({ mobile })
        if (!user) {
          user = await playerDao.create({ mobile })
        }
        data = { mobile };
        data.type = 'player';
        data.otp = 1234 //Otp.otpGenerator();
        await otpDao.create(data)
        let response = {}
        response.statusCode = 200
        const { isActive, isDeleted, isEmailSet, isPasswordSet } = user
        response.data = { isActive, isDeleted, isEmailSet, isPasswordSet }
        response.message = 'OTP has been sent successfully !'
        return response
      } catch (exception) {
        fastify.log.error('An unxpected error occurred while authorizing an user', mongooseErrorHandler(exception, {})
        )
      }
    },
    playerAuthorization: async (payload) => {
      let user
      let isOtpExists
      try {
        const { mobile, otp } = payload
        isOtpExists = await otpDao.findOne({ mobile, otp })
        if (!isOtpExists) {
          return { message: 'Unauthorized Access, Invalid otp', statusCode: 401 }
        } else {
          user = await playerDao.findOne({ mobile })
        }
        return { token: await user.generateToken(fastify.jwt) }
      } catch (exception) {
        fastify.log.error('An unxpected error occurred while authorizing an user', mongooseErrorHandler(exception, {})
        )
      }
    }
  }
}
