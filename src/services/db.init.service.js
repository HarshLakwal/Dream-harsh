module.exports = ({ log, config }) => {
  const { UserRoleModel } = require('../models/user.role.model')
  const { UserModel } = require('../models/user.model')
  const { mongooseErrorHandler, logError } = require('../utils/db.error.handler')
  return {
    initUserRoles: async () => {
      const SYSTEM_USER_ROLES = [
        { name: 'SUPER_ADMIN' },
        { name: 'ORG_ADMIN' },
        { name: 'VERIFIER' },
        { name: 'EMPLOYEE' }
      ]
      try {
        const userRoles = await UserRoleModel.find({})

        if (!userRoles.length) {
          await UserRoleModel.insertMany(SYSTEM_USER_ROLES)
        }
        log.info('User Roles Checked')
      } catch (exception) {
        logError(log, 'An unxpected error occurred while authorizing an user', mongooseErrorHandler(exception, {}))
      }
    },
    createSuperAdmin: async () => {
      const SUPER_ADMIN_CONFIG = require('./../config/super.admin.config.json')
      try {
        const data = await UserRoleModel.findOne({
          name: 'SUPER_ADMIN'
        })

        const { userRoleId } = data
        const superAdmin = await UserModel.findOne({
          userRoleId
        })

        if (!superAdmin) {
          await UserModel.create({ ...SUPER_ADMIN_CONFIG, userRoleId })
        }
        log.info('Super Admin User Checked')
      } catch (exception) {
        logError(log, 'An unxpected error occurred while authorizing an user', mongooseErrorHandler(exception, {}))
      }
    }
  }
}
