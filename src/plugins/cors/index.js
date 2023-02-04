const fastifyPlugin = require('fastify-plugin')
const cors = require('@fastify/cors')
module.exports = fastifyPlugin(async function (fastify, opts) {
  fastify.register(cors, {
    origin: '*', // ["*", "http://34.193.81.105:7000", "http://172.31.95.42:7000", "http://localhost:8081/"],
    methods: ['POST', 'PUT', 'GET', 'PATCH', 'DELETE', 'FETCH']
  })
})
