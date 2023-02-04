const { RolesModel } = require('../models/roles.model')
const { IOError } = require('../utils/error')
const { mongooseErrorHandler } = require('../utils/db.error.handler')
const { getPagination, buildGetDataQuery, logError } = require('../utils/db.builder')

module.exports = ({ log }) => ({
  create: async (data) => {
    try {
      return await RolesModel.create(data)
    } catch (exception) {
      logError(log, 'Error occurred while adding a role', mongooseErrorHandler(exception, {}))
    }
  },
  get: async (data) => {
    const { page, size } = data
    const { limit, offset } = getPagination(page, size)
    try {
      return await RolesModel.paginate(buildGetDataQuery(data), { limit, offset })
    } catch (exception) {
      logError(log, 'Error occurred while getting roles', mongooseErrorHandler(exception, {}))
    }
  },
  getById: async (id) => {
    try {
      const result = await RolesModel.findOne({ roleId: id })
      if (!result) {
        throw new IOError('Resource Not Found', { statusCode: 404 })
      }
      return result
    } catch (exception) {
      logError(log, 'Error occurred while getting a role', mongooseErrorHandler(exception, {}))
    }
  },
  update: async (data) => {
    const { id } = data
    try {
      return await RolesModel.updateOne({ roleId: id }, data)
    } catch (exception) {
      logError(log, 'Error occurred while updating a role', mongooseErrorHandler(exception, {}))
    }
  },
  delete: async (id) => {
    try {
      return await RolesModel.deleteOne({ roleId: id })
    } catch (exception) {
      logError(log, 'Error occurred while deleting a role', mongooseErrorHandler(exception, {}))
    }
  }
})
