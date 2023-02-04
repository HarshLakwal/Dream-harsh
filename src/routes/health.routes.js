module.exports = async (fastify) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Health']
      }
    },
    () => {
      return { message: 'Service is up and running' }
    }
  )
}
