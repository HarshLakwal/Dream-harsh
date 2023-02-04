module.exports = ({ log }) => {
    const matchListModel = require('../models/matchListModel.js')
    const {
        mongooseErrorHandler,
        logError
    } = require('../utils/db.error.handler')

    return {
        create: async (data) => {
            
            try {
                return await matchListModel.create(data)
            } catch (exception) {
                log.error('Error occurred while create dao cricket', mongooseErrorHandler(exception, {}))
            }
        },
        findOne: async (data) => {
            try {
                return await matchListModel.findOne(data)
            } catch (exception) {
                log.error('Error occurred while findOne dao cricket', mongooseErrorHandler(exception, {}))
            }
        },
        find: async (data) => {
            try {
                return await matchListModel.find()
            } catch (exception) {
                log.error('Error occurred while findOne dao cricket', mongooseErrorHandler(exception, {}))
            }
        },
    }
}
