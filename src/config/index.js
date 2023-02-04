const fastifyPlugin = require('fastify-plugin')
const fastifyEnv = require('@fastify/env')

module.exports = fastifyPlugin((fastify, opts, next) => {
  const schema = {
    type: 'object',
    required: [
      'MONGODB_CONNECTION_URI',
      'HOST',
      'PORT',
      'VERSION',
      'JWT_SECRET'
    ],
    properties: {
      MONGODB_CONNECTION_URI: {
        type: 'string',
        default: ''
      },
      HOST: {
        type: 'string',
        default: 'localhost'
      },
      VERSION: {
        type: 'string',
        default: 'v1'
      },
      PORT: {
        type: 'number',
        default: 8081
      },
      JWT_SECRET: {
        type: 'string'
      },
      AUTH_ENABLED: {
        type: 'string',
        default: false
      },
      AWS_SECRET_ACCESS_KEY: {
        type: 'string'
      },
      AWS_ACCESS_KEY_ID: {
        type: 'string'
      },
      AWS_REGION: {
        type: 'string'
      },
      S3_BUCKET: {
        type: 'string'
      }
    }
  }

  fastify.register(fastifyEnv, {
    schema,
    confKey: 'config',
    dotenv: true,
    data: process.env
  })
  next()
})
