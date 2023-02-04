module.exports = (fastify) => {
    const matchListDao = require('../dao/matchList.dao')(fastify)
    const { mongooseErrorHandler, logError } = require('../utils/db.error.handler');
    const { httpResponseHandler, httpResponseHandlerWithPagination } = require('../utils/response.handler')
    const { getRequest } = require('../utils/axios.js')
    const { createJob } = require('../plugins/cron')
    const ENTITY_TOKEN = process.env.ENTITY_TOKEN
    const ENTITY_URL = process.env.ENTITY_URL
    return {
        createMatchList: async (data) => {
            try {
                return await matchListDao.create({ items: data.items })
            } catch (err) {
                fastify.log.error('Error occurred while createMatchList', mongooseErrorHandler(err, {})
                )
            }
        },
        getEntityResponse: () => {
            try {
                const job1 = createJob('* * * * *', function () {
                    const getMatchListEntity = async (payload) => {
                        try {
                            await getRequest(`${ENTITY_URL}?status=2&token=${ENTITY_TOKEN}`).then((res) => {
                                result = matchListDao.create(res.data.response)
                                return (httpResponseHandler(result))
                            }).catch((exception) => {
                                fastify.log.error('An unxpected error occurred while getMatchListEntity getRequest service', mongooseErrorHandler(exception, {})
                                )
                            })
                        } catch (exception) {
                            fastify.log.error('An unxpected error occurred while authorizing an user', mongooseErrorHandler(exception, {})
                            )
                        }
                    }
                    getMatchListEntity()
                })
                job1.start()
            }
            catch (err) {
                fastify.log.error('Error occurred while getEntityResponse', err, {})
            }
        },
    }
}