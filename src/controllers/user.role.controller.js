module.exports = (fastify) => {
  const UserRoleService = require('../services/user.role.service')(fastify)
  const {
    httpResponseHandler,
    httpResponseHandlerWithPagination
  } = require('../utils/response.handler')
  return {
    create: async (request, reply) => {
      const { body } = request
      let result
      try {
        result = await UserRoleService.create(body)
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
        result = await UserRoleService.get(query)
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
        result = await UserRoleService.getById(id)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.send(httpResponseHandler(result))
    },

    update: async (request, reply) => {
      const { body, params } = request
      let result
      try {
        result = await UserRoleService.update({ ...body, ...params })
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
        result = await UserRoleService.delete(id)
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
