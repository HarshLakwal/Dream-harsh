module.exports = (fastify) => {
  const AuthService = require('../services/playerAuth.service')(fastify)
  const { httpResponseHandler } = require('../utils/response.handler')
  return {
    authentication: async (request, reply) => {
      const { body } = request
      console.log(body)
      let result
      try {
        result = await AuthService.playerAuthentication(body)
      } catch (exception) {
        const { message, statusCode } = exception
        if (statusCode) {
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred palyerAuth controller authentication function: ${message}`)
        } else {
          return reply
            .status(500)
            .send(`An unxpected error occurred palyerAuth controller authentication function: ${message}`)
        }
      }
      return reply.send(httpResponseHandler(result))
    },

    authorization: async (request, reply) => {
      const { body } = request
      let result
      try {
        result = await AuthService.playerAuthorization(body)
      } catch (exception) {
        const { message, statusCode } = exception
        if (statusCode) {
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred palyerAuth controller authorization function: ${message}`)
        } else {
          return reply
            .status(500)
            .send(`An unxpected error occurred palyerAuth controller authorization function: ${message}`)
        }
      }
      return reply.send(httpResponseHandler(result))
    },

    logout: async (request, reply) => {
      const { token } = request.headers
      let result
      try {
        result = await AuthService.logout(token)
      } catch (exception) {
        const { message, statusCode } = exception
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    }
  }
}
