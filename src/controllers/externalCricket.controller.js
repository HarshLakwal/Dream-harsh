const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
module.exports = (fastify) => {
  const externalCricketService = require('../services/externalCricket.service')(fastify);
  const {
    httpResponseHandler,
    httpResponseHandlerWithPagination
  } = require('../utils/response.handler');
  return {
    getMatchListEntity: async (req, reply) => {
      const { body } = req
      let result
      try {
        result = externalCricketService.getEntityResponse()
      } catch (exception) {
        const { message, statusCode } = exception
        if (statusCode) {
          return reply
            .status(statusCode)
            .send(`An unxpected error occurred getMatchList controller ${message}`)
        } else {
          return reply
            .status(500)
            .send(`An unxpected error occurred getMatchList controller ${message}`)
        }
      }
      return reply.send(httpResponseHandler(result))
    },
   
  }

  // return {
  //   getMatchListData : async( req, rep)=> {
  //     const {body}
  //   }
  // }
}