module.exports = async (fastify) => {
  const UserController = require('../controllers/user.controller')(fastify)
  const UserSchema = require('../schemas/user.schema')

  fastify.route({
    method: 'POST',
    url: '/',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: UserSchema.POST,
    handler: UserController.create
  })

  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: [fastify.authenticate],
    schema: UserSchema.GET,
    handler: UserController.get
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    onRequest: [fastify.authenticate],
    schema: UserSchema.GET_BY_ID,
    handler: UserController.getById
  })

  fastify.route({
    method: 'PUT',
    url: '/:id',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: UserSchema.PUT,
    handler: UserController.update
  })
  fastify.route({
    method: 'PATCH',
    url: '/:id',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: UserSchema.PATCH,
    handler: UserController.patch
  })
  fastify.route({
    method: 'DELETE',
    url: '/:id',
    onRequest: [fastify.authenticate, fastify.authorize],
    schema: UserSchema.DELETE,
    handler: UserController.delete
  })
  fastify.route({
    method: 'GET',
    url: '/validate/:email',
    schema: UserSchema.GET_BY_EMAIL,
    handler: UserController.getByEmail
  })
}
