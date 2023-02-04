const { UserRoleModel } = require('../models/user.role.model')
const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
const { getPagination, buildGetDataQuery } = require('../utils/db.builder')
const { IOError } = require('../utils/error')

module.exports = ({ log }) => ({
  create: async (data) => {
    try {
      return await UserRoleModel.create(data)
    } catch (exception) {
      logError(log, 'Error occurred while adding an user role', mongooseErrorHandler(exception, {}))
    }
  },
  get: async (data) => {
    const { page, size } = data
    const { limit, offset } = getPagination(page, size)
    try {
      return await UserRoleModel.paginate(buildGetDataQuery(data), { limit, offset })
    } catch (exception) {
      logError(log, 'Error occurred while getting the user roles', mongooseErrorHandler(exception, {}))
    }
  },
  getById: async (id) => {
    try {
      const result = await UserRoleModel.findOne({ userRoleId: id })
      if (!result) {
        throw new IOError('Resource Not Found', { statusCode: 404 })
      }
      return result
    } catch (exception) {
      logError(log, 'Error occurred while getting an user role', mongooseErrorHandler(exception, {}))
    }
  },
  update: async (data) => {
    const { id } = data
    try {
      return await UserRoleModel.updateOne({ userRoleId: id }, data)
    } catch (exception) {
      logError(log, 'Error occurred while updating an user role', mongooseErrorHandler(exception, {}))
    }
  },
  delete: async (id) => {
    try {
      return await UserRoleModel.deleteOne({ userRoleId: id })
    } catch (exception) {
      logError(log, 'Error occurred while deleting an user role', mongooseErrorHandler(exception, {}))
    }
  }
})
