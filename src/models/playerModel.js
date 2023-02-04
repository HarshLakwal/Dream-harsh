const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoosePaginate = require('mongoose-paginate-v2')
const bcrypt = require('bcrypt-nodejs')
const uuid = require('uuid')
const validator = require('validator')
const { isEmail } = require('validator')
const Address = {
  _id: false,
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipCode: {
    type: String
  },
  country: {
    type: String
  }
}

const playerSchema = new Schema({
  playertId: {
    type: String,
    isRequired: true,
    default: () => uuid.v4(),
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'Invalid UUID'
    }
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    immutable: true,
    unique: true,
    validate: [isEmail, 'Enter valid email address'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  avatar: {
    type: String
  },
  address: {
    type: Address
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isPasswordSet: {
    default: false,
    type: Boolean
  },
  isEmailSet: {
    default: false,
    type: Boolean
  },
  expire_at: {
    type: Date,
    default: Date.now,
    expires: 60,
  }
},
  {
    versionKey: false,
    timestamps: true
  });
playerSchema.pre('save', async function (next) {
  try {
    const user = this
    await processUserPasswordFlow(user)
    next()
  } catch (err) {
    next(err)
  }
})
const processUserPasswordFlow = async (user) => {
  // generate random password and send the mail;
  if (!user.isModified('password')) {
    user.password = generateRandomPassword()
  }

  // decrypting password
  if (user.password) {
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(user.password, salt, null)
    user.password = hash
  }
}
const generateRandomPassword = function () {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    new Date().getTime() // for unique
  const charsLength = chars.length
  const passwordLength = 12
  let password = ''
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * charsLength)
    password += chars.substring(randomNumber, randomNumber + 1)
  }
  return password
}

playerSchema.methods.generateToken = async function (jwt) {
  const player = this
  const data = player.toJSON()
  const { createdAt, isActive, isDeleted, isEmailSet, isPasswordSet, mobile, playertId, updatedAt } = data
  const tokenData = { createdAt, isActive, isDeleted, isEmailSet, isPasswordSet, mobile, playertId, updatedAt }
  const $token = jwt.sign(tokenData)
  return $token
}
playerSchema.methods.deleteToken = async function () {
  const user = this
  return await user.update({ $unset: { session: 1 } })
}
const playerModel = new mongoose.model('player', playerSchema);

module.exports = { playerModel, playerSchema }
