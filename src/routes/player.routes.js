module.exports = async (fastify) => {
  const playerController = require('../controllers/player.controller')(fastify)
  const playerSchema = require('../schemas/player.schemes')

  fastify.route({
    method: 'POST',
    url: '/',
    //onRequest: [fastify.authenticate, fastify.authorize],
    schema: playerSchema.POST,
    handler: playerController.create
  })

  
  // fastify.route({
  //   method: 'POST',
  //   url: '/verify',
  //   //onRequest: [fastify.authenticate, fastify.authorize],
  //   schema: playerOtp.POST,
  //   handler: UserController.verify
  // })


}
