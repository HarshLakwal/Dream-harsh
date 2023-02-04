'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const config = require('./src/config')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  await fastify.register(config)
  // await fastify.register(require("fastify-url").default);
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'src/plugins'),
    options: Object.assign({}, opts)
  })
  fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
      done(null, JSON.parse(body))
    } catch (err) {
      done(err, undefined)
    }
  })
  
  // This loads all plugins defined in routes 
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'src/routes'),
    options: Object.assign({ prefix: '/api/v1' }, opts)
  })
}
