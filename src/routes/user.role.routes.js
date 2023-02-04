module.exports = async (fastify) => {
  const UserRoleController = require('../controllers/user.role.controller')(fastify)
  const UserRoleSchema = require('../schemas/user.role.schema')

  // fastify.route({
  //   method: 'POST',
  //   url: '/',
  //   onRequest: [fastify.authenticate], // keep this for route to authenticate routes
  //   schema: UserRoleSchema.POST,
  //   handler: UserRoleController.create
  // })

  fastify.route({
    method: 'GET',
    url: '/',
    onRequest: [fastify.authenticate],
    schema: UserRoleSchema.GET,
    handler: UserRoleController.get
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    onRequest: [fastify.authenticate],
    schema: UserRoleSchema.GET_BY_ID,
    handler: UserRoleController.getById
  })

  // fastify.route({
  //   method: 'PUT',
  //   url: '/:id',
  //   onRequest: [fastify.authenticate],
  //   schema: UserRoleSchema.PUT,
  //   handler: UserRoleController.update
  // })

  // fastify.route({
  //   method: 'DELETE',
  //   url: '/:id',
  //   onRequest: [fastify.authenticate],
  //   schema: UserRoleSchema.DELETE,
  //   handler: UserRoleController.delete
  // })
}
