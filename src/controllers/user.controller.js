module.exports = (fastify) => {
  const UserService = require('../services/user.service')(fastify)
  const {
    httpResponseHandler,
    httpResponseHandlerWithPagination
  } = require('../utils/response.handler')
  return {
    create: async (request, reply) => {
      const { body } = request
      let result
      try {
        result = await UserService.create(body)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    },

    get: async (request, reply) => {
      const { query } = request
      let result
      try {
        result = await UserService.get(query)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandlerWithPagination(result))
    },

    getById: async (request, reply) => {
      const { id } = request.params
      let result
      try {
        result = await UserService.getById(id)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    },

    getByEmail: async (request, response) => {
      const {
        params: { email }
      } = request
      let user
      try {
        user = await UserService.getByEmail(email)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return response
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return response.status(200).send(httpResponseHandler(user))
    },

    update: async (request, reply) => {
      const { body, params } = request
      let result
      try {
        result = await UserService.update({ ...body, ...params })
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    },

    patch: async (request, reply) => {
      const { body, params, query } = request
      let result
      try {
        result = await UserService.patch({ ...body, ...params, ...query })
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    },

    delete: async (request, reply) => {
      const { id } = request.params
      let result
      try {
        result = await UserService.delete(id)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result || { deleted: id }))
    }
  }
}
