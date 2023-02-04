module.exports = async (fastify) => {
  const health = require('./health.routes')
  const users = require('./user.routes')
  const auth = require('./auth.routes')
  const userRoles = require('./user.role.routes')
  const roles = require('./roles.routes')

  const playerAuth = require('./playerAuth.routes');
  const cricket = require('./cricket.routes')

  fastify.register(playerAuth, { prefix: '/' })
  fastify.register(cricket, { prefix: '/cricket' })

  fastify.register(health, { prefix: '/live' })
  fastify.register(users, { prefix: '/users' })
  fastify.register(auth, { prefix: '/' })
  fastify.register(userRoles, { prefix: '/userRoles' })
  fastify.register(roles, { prefix: '/roles' })
}
