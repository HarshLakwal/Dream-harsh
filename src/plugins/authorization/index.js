const fastifyPlugin = require('fastify-plugin')
module.exports = fastifyPlugin(async (fastify, opts) => {
  const UserRoleRestrictedMatrix = require('../../config/user.role.restricted.matrix')
  const UserRoleService = require('../../services/user.role.service')(fastify)
  fastify.decorate('authorize', async (request, reply) => {
    try {
      const { AUTH_ENABLED } = fastify.config
      if (['false', false].includes(AUTH_ENABLED)) {
        return true
      }

      const { user, method, url } = request
      if (!user) {
        reply.status(401).send('Authentication Failed!')
      } else if (method !== 'GET') {
        const { userRoleId } = user
        const userRole = await UserRoleService.getById(userRoleId)
        if (!userRole) {
          reply.status(403).send('Invalid User Role!')
        } else {
          const path = url.replace('/api/v1/', '')
          const resource = path.split('/')[0]
          const hasAuthorization =
            UserRoleRestrictedMatrix[userRole.name][resource]
          const hasRestricted = hasAuthorization?.includes(method)
          if (hasRestricted) {
            reply.status(403).send('RBAC: Access Denied!')
          }
        }
        return true
      }
    } catch (err) {
      reply.send(err)
    }
  })
})
