const flatten = require('flat')

const { UserModel } = require('../models/user.model')
const { IOError } = require('../utils/error')
const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
const { getPagination, buildGetDataQuery } = require('../utils/db.builder')

module.exports = ({ log }) => ({
  create: async (data) => {
    try {
      return await UserModel.create(data)
    } catch (exception) {
      logError(
        log,
        'Error occurred while adding an user',
        mongooseErrorHandler(exception, {})
      )
    }
  },
  get: async (data) => {
    const { page, size } = data
    const { limit, offset } = getPagination(page, size)
    try {
      return await UserModel.paginate(buildGetDataQuery(data), {
        limit,
        offset
      })
    } catch (exception) {
      logError(
        log,
        'Error occurred while getting users',
        mongooseErrorHandler(exception, {})
      )
    }
  },
  getById: async (id) => {
    try {
      const result = await UserModel.findOne({ userId: id })
      if (!result) {
        throw new IOError('Resource Not Found', { statusCode: 404 })
      }
      return result
    } catch (exception) {
      logError(
        log,
        'Error occurred while getting an user',
        mongooseErrorHandler(exception, {})
      )
    }
  },

  getByEmail: async (email) => {
    try {
      const result = await UserModel.findOne({ email })
      if (!result) {
        throw new IOError('Resource Not Found', { statusCode: 404 })
      }
      return result
    } catch (exception) {
      logError(
        log,
        'Error occurred while getting an user by Email',
        mongooseErrorHandler(exception, {})
      )
    }
  },

  update: async (data) => {
    const { id } = data
    try {
      return await UserModel.updateOne({ userId: id }, flatten(data), {
        runValidators: true
      })
    } catch (exception) {
      logError(
        log,
        'Error occurred while updating an user',
        mongooseErrorHandler(exception, {})
      )
    }
  },
  patch: async (data) => {
    const { id } = data
    let result
    try {
      result = await UserModel.updateOne({ userId: id }, flatten(data), {
        runValidators: true
      })
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
      return await UserModel.deleteOne({ userId: id })
    } catch (exception) {
      logError(
        log,
        'Error occurred while deleting an user',
        mongooseErrorHandler(exception, {})
      )
    }
  }
})
