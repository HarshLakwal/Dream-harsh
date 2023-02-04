const fastifyPlugin = require('fastify-plugin')
const jwt = require('@fastify/jwt')
module.exports = fastifyPlugin(async function (fastify, opts) {
  fastify.register(jwt, {
    secret: '6564654654654545465456'
  })
})
