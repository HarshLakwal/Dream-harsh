const fastifyPlugin = require('fastify-plugin')
module.exports = fastifyPlugin(async function (fastify, opts) {
  const { AUTH_ENABLED } = fastify.config
  // fastify.register(jwt, {
  //   secret: "638afdc97ca894301397237b"
  // })

  fastify.decorate('authenticate', async function (request, reply) {
    try {
      if (AUTH_ENABLED === 'true') {
        await request.jwtVerify()
      }
      return {}
    } catch (err) {
      reply.send(err)
    }
  })
})
