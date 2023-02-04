// load the things we need
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const uuid = require('uuid')
const validator = require('validator')
const Schema = mongoose.Schema

const RolesSchema = {
  roleId: {
    type: String,
    default: () => uuid.v4(),
    unique: true,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'Invalid UUID'
    }
  },
  orgId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'orgId is invalid UUID'
    },
    ref: 'orgs'
  },
  name: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}

const schema = new Schema(RolesSchema, {
  collection: 'roles',
  timestamps: true
})

schema.plugin(mongoosePaginate)
 
schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
const RolesModel = mongoose.model('roles', schema, 'roles')

module.exports = { RolesModel, RolesSchema }
