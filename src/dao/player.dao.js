module.exports = ({ log }) => {
  const {playerModel} = require('../models/playerModel')
  const {
    mongooseErrorHandler,
    logError
  } = require('../utils/db.error.handler')

  return {
    findOne: async (query) => {
      try {
        return await playerModel.findOne(query)
      } catch (exception) {
        log.error('An unxpected error occurred while accessing usermodal dao',
          mongooseErrorHandler(exception, {})
        )
      }
    },
    create: async (data) => {
      try {
        return await playerModel.create(data)
      } catch (exception) {
        log.error('Error occurred while adding an user', mongooseErrorHandler(exception, {}))
      }
    },
    generateToken: async (query) => {
      try {
        return await playerModel.generateToken(query)
      } catch (exception) {
        log.error('An unxpected error occurred while accessing player dao generateToken',
          mongooseErrorHandler(exception, {})
        )
      }
    },
    get: async (data) => {
      const { page, size } = data
      const { limit, offset } = getPagination(page, size)
      try {
        return await playerModel.paginate(buildGetDataQuery(data), { limit, offset })
      } catch (exception) {
        logError(log, 'Error occurred while getting users', mongooseErrorHandler(exception, {}))
      }
    },
    getById: async (id) => {
      try {
        const result = await playerModel.findOne({ userId: id })
        if (!result) {
          throw new IOError('Resource Not Found', { statusCode: 404 })
        }
        return result
      } catch (exception) {
        logError(log, 'Error occurred while getting an user', mongooseErrorHandler(exception, {}))
      }
    },

    getByEmail: async (email) => {
      try {
        const result = await playerModel.findOne({ email: email })
        if (!result) {
          throw new IOError('Resource Not Found', { statusCode: 404 })
        }
        return result
      } catch (exception) {
        logError(log, 'Error occurred while getting an user by Email', mongooseErrorHandler(exception, {}))
      }
    },

    update: async (data) => {
      const { id } = data
      try {
        return await playerModel.updateOne({ userId: id }, data)
      } catch (exception) {
        logError(log, 'Error occurred while updating an user', mongooseErrorHandler(exception, {}))
      }
    },
    delete: async (id) => {
      try {
        return await playerModel.deleteOne({ userId: id })
      } catch (exception) {
        logError(log, 'Error occurred while deleting an user', mongooseErrorHandler(exception, {}))
      }
    }
  }
}
