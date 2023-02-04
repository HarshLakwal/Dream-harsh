const fastifyPlugin = require('fastify-plugin')

module.exports = fastifyPlugin((fastify, opts, next) => {
  const mongoose = require('mongoose')
  mongoose.set({ strictQuery: true })
  const initDbService = async () => {
    const dbInitService = require('../../services/db.init.service')(fastify)
    await dbInitService.initUserRoles()
    await dbInitService.createSuperAdmin()
  }
  const { config } = fastify
  mongoose
    .connect(config.MONGODB_CONNECTION_URI)
    .then(async () => {
      fastify.log.info('MongoDB connected')
      await initDbService()
    })
    .catch((err) => {
      fastify.log.error({ err }, 'MongoConnect Error')
    })
  next()
})
