module.exports = (fastify) => {
    const matchListDao = require('../dao/matchList.dao')(fastify)
    const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
    return {
        get: async (payload) => {
            try {
                return await matchListDao.find()
            } catch (exception) {
                console.log(exception)
                fastify.log.error('An unxpected error occurred while getMatchListData from Dao service', mongooseErrorHandler(exception, {})
                )
            }
        }
    }
}