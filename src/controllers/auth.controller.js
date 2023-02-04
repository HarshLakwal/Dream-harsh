module.exports = (fastify) => {
  const AuthService = require('../services/Auth.service')(fastify)
  const { httpResponseHandler } = require('../utils/response.handler')
  return {
    login: async (request, reply) => {
      const { body } = request
      let result
      try {
        result = await AuthService.login(body)
      } catch (exception) {
        const { message, statusCode } = exception
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    },

    signup: async (request, reply) => {
      const { body } = request
      try {
        await AuthService.signup(body)
      } catch (exception) {
        console.log(exception)
        const { message, statusCode } = exception

        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(
        httpResponseHandler({ message: 'Successfully Registered!' })
      )
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
