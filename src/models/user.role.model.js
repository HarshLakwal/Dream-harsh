// load the things we need
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const uuid = require('uuid')
const validator = require('validator')
const Schema = mongoose.Schema

const UserRoleSchema = {
  userRoleId: {
    type: String,
    default: () => uuid.v4(),
    unique: true,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'userRoleId is invalid UUID'
    }
  },
  name: {
    type: String,
    enum: ['SUPER_ADMIN', 'ORG_ADMIN', 'VERIFIER', 'EMPLOYEE'],
    default: 'EMPLOYEE'
  }
}

const schema = new Schema(UserRoleSchema, {
  collection: 'user_roles',
  timestamps: true
})

schema.plugin(mongoosePaginate)

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

const UserRoleModel = mongoose.model('user_roles', schema, 'user_roles')

module.exports = { UserRoleModel, UserRoleSchema }
