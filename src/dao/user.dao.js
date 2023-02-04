module.exports = ({ log }) => {
  const { UserModel } = require('../models/user.model')
  return {
    userModelFindOne: async (query) => {
      try {
        return await UserModel.findOne(query)
      } catch (exception) {
        logError(log, 'An unxpected error occurred while accessing usermodal dao', mongooseErrorHandler(exception, {})
        )
      }
    }
  }
}
