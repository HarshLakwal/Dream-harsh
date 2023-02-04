module.exports = (fastify, config, boom) => {
  const RolesService = require('../services/roles.service')(fastify)
  const { httpResponseHandler, httpResponseHandlerWithPagination } = require('../utils/response.handler')
  return {
    create: async (request, reply) => {
      const { body: rolesToCreate } = request
      let createdRoles
      try {
        createdRoles = await RolesService.create(rolesToCreate)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return reply
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return reply.status(200).send(httpResponseHandler(createdRoles))
    },

    get: async (request, response) => {
      const { query } = request
      let roles
      try {
        roles = await RolesService.get(query)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return response
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return response.status(200).send(httpResponseHandlerWithPagination(roles))
    },

    getById: async (request, response) => {
      const {
        params: { id }
      } = request
      let roles
      try {
        roles = await RolesService.getById(id)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return response
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return response.status(200).send(httpResponseHandler(roles))
    },

    update: async (request, response) => {
      const {
        body,
        params: { id }
      } = request
      let roles
      try {
        roles = await RolesService.update({ ...body, id })
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return response
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return response.status(200).send(httpResponseHandler(roles))
    },

    delete: async (request, response) => {
      const {
        params: { id }
      } = request
      let deletedRoles
      try {
        deletedRoles = await RolesService.delete(id)
      } catch (exception) {
        const { message, statusCode } = exception
        // if required can be logged here
        return response
          .status(statusCode)
          .send(`An unxpected error occurred: ${message}`)
      }
      return response.status(200).send(httpResponseHandler(deletedRoles))
    }
  }
}
