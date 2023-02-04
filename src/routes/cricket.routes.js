module.exports = async (fastify)=> {
    const cricketController = require('../controllers/cricket.controller')(fastify)
    const externalCricketController = require('../controllers/externalCricket.controller')(fastify)
    const cricketService = require('../services/cricket.service')(fastify)
    fastify.route({
        method: 'GET',
        url:'/match-list',
        handler: externalCricketController.getMatchListEntity
    })
    fastify.route({
        method: 'GET',
        url:'/matchList-data',
        handler: cricketService.get
    })
} 