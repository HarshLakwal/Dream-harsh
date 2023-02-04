module.exports = async (fastify) => {
  const RolesController = require('../controllers/roles.controller')(fastify)
  const RolesSchema = require('../schemas/roles.schema')

  fastify.route({
    method: 'POST',
    url: '/',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: RolesSchema.POST,
    handler: RolesController.create
  })

  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: [fastify.authenticate],
    schema: RolesSchema.GET,
    handler: RolesController.get
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    onRequest: [fastify.authenticate],
    schema: RolesSchema.GET_BY_ID,
    handler: RolesController.getById
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: RolesSchema.PUT,
    handler: RolesController.update
  })

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: RolesSchema.DELETE,
    handler: RolesController.delete
  })
}
