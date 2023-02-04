module.exports = (fastify) => {
  const { log } = fastify 
  const { IOError } = require('../utils/error')
  const {
    buildPatchQuery,
    getPagination,
    buildGetDataQuery
  } = require('../utils/db.builder')
  const {
    mongooseErrorHandler,
    logError
  } = require('../utils/db.error.handler')
  return {
    create: async (data) => {
      let result
      try {
        result = await OrgModel.create(data)
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while add an org',
          mongooseErrorHandler(exception, {})
        )
      }
      return result
    },

    get: async (data) => {
      const { page, size } = data
      const { limit, offset } = getPagination(page, size)
      let result
      try {
        result = await OrgModel.paginate(buildGetDataQuery(data), {
          limit,
          offset,
          lean: true
        })

        result.docs.forEach((d) => {
          d.logo = fastify.getSignedUrl(d.logo)
        })
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while get orgs',
          mongooseErrorHandler(exception, {})
        )
      }
      return result
    },

    getById: async (id) => {
      let result
      try {
        result = await OrgModel.findOne({ orgId: id }).lean()
        if (!result) {
          throw new IOError('Resource Not Found', { statusCode: 404 })
        }
        result.logo = fastify.getSignedUrl(result.logo)
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while get an org',
          mongooseErrorHandler(exception, {})
        )
      }
      return result
    },

    update: async (data) => {
      const { id } = data
      let result
      try {
        result = await OrgModel.updateOne({ orgId: id }, data)
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while update an org',
          mongooseErrorHandler(exception, {})
        )
      }
      return result
    },

    patch: async (data) => {
      const { id } = data
      let result
      try {
        result = await OrgModel.updateOne(
          { orgId: id },
          buildPatchQuery(data, OrgSchema)
        )
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while partially update an org',
          mongooseErrorHandler(exception, {})
        )
      }
      return { ...result, success: true }
    },

    delete: async (id) => {
      try {
        return await OrgModel.deleteOne({ orgId: id })
      } catch (exception) {
        logError(
          log,
          'An unxpected error occurred while delete an org',
          mongooseErrorHandler(exception, {})
        )
      }
    }
  }
}
