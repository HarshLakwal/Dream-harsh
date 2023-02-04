module.exports = async (fastify) => {
  const AuthController = require('../controllers/playerAuth.controller')(fastify)
  const AuthSchema = require('../schemas/palyerAuth.schema')
  fastify.route({
    method: 'POST',
    url: '/player-authentication',
    schema: AuthSchema.AUTHENTICATION,
    handler: AuthController.authentication
  })
  fastify.route({
    method: 'POST',
    url: '/player-authorization',
    schema: AuthSchema.AUTHORIZATION,
    handler: AuthController.authorization
  })
}
