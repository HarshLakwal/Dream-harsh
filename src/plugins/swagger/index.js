const fastifyPlugin = require('fastify-plugin')
const fastifySwagger = require('@fastify/swagger')

module.exports = fastifyPlugin((fastify, opts, next) => {
  const { PORT, HOST, VERSION } = fastify.config
  const swaggerConfig = {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
      basePath: `/api/${VERSION}`,
      info: {
        title: 'dream-player microservice',
        description: 'dream-player microservice',
        version: '1.0.0'
      },
      host: `${HOST}:${PORT}`,
      schemes: ['http', 'https'],
      consumes: ['application/json', 'multipart/form-data'],
      produces: ['application/json'],
      apis: ['../../routes/*.js'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          description: 'Value: Bearer {jwt}',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [{ JWT: [] }]
    }

    // TODO: need to be add swagger schema validation
    // jsonShorthand: false,
    // ajv: {
    //   customOptions: {}, // additional JTD options
    //   mode: "JTD",
    // },
    // schemaController: {
    //   compilersFactory: {
    //     buildValidator: require("@fastify/ajv-compiler")(),
    //   },
    // },
  }

  fastify.register(fastifySwagger, swaggerConfig)
  fastify.register(require('@fastify/swagger-ui'), swaggerConfig)
  next()
})
