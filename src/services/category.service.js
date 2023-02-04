module.exports = ({ log }) => {
  const { CategoryModel } = require('../models/category.model')
  const { IOError } = require('../utils/error')
  const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
  const { getPagination } = require('../utils/db.builder')
  return {
    create: async (data) => {
      let result
      try {
        result = await CategoryModel.create(data)
      } catch (exception) {
        const { message, statusCode } = mongooseErrorHandler(exception, {})
        const ioError = new IOError(message, {
          statusCode,
          origError: exception
        })
        log.error(
          `An unxpected error occurred while add a category : ${ioError.message} `,
          ioError
        )
        log.error(`${ioError.message} - request`, ioError)
        throw ioError
      }
      return result
    },

    get: async (data) => {
      const { page, size, orgId } = data
      const { limit, offset } = getPagination(page, size)
      let result
      try {
        const aggregateQuery = CategoryModel.aggregate([
          {
            $match: {
              orgId
            }
          },
          {
            $lookup: {
              from: 'categories',
              as: 'parent',
              let: { parentId: '$parentId' },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ['$$parentId', '$categoryId'] }
                  }
                },
                {
                  $project: { name: '$categoryName', id: '$categoryId' }
                }
              ]
            }
          },
          {
            $unwind: {
              path: '$parent',
              preserveNullAndEmptyArrays: true
            }
          }
        ])

        result = await CategoryModel.aggregatePaginate(aggregateQuery, {
          offset,
          limit
        })
      } catch (exception) {
        logError(log, 'An unxpected error occurred while get categories', mongooseErrorHandler(exception, {}))
      }
      return result
    },

    getById: async (id) => {
      let result
      try {
        result = await CategoryModel.findOne({ categoryId: id })
        if (!result) {
          throw new IOError('Resource Not Found', { statusCode: 404 })
        }
      } catch (exception) {
        logError(log, 'An unxpected error occurred while get a category', mongooseErrorHandler(exception, {}))
      }
      return result
    },

    update: async (data) => {
      const { id } = data
      let result
      try {
        result = await CategoryModel.updateOne({ categoryId: id }, data)
      } catch (exception) {
        logError(log, 'An unxpected error occurred while update a category', mongooseErrorHandler(exception, {}))
      }
      return result
    },

    delete: async (id) => {
      try {
        return await CategoryModel.deleteOne({ categoryId: id })
      } catch (exception) {
        logError(log, 'An unxpected error occurred while delete a category', mongooseErrorHandler(exception, {}))
      }
    }
  }
}
