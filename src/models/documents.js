// Mongoose
const mongoose = require('mongoose')
const validator = require('validator')

// define the schema for attachmenongoDB connectedt model
const DocumentSchema = mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  docUrl: { type: String, required: true },
  orgId: {
    type: String,
    required: false,
    ref: 'organization',
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'Invalid UUID'
    }
  },
  ext: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() }
})

module.exports = DocumentSchema
