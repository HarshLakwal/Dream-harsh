// load the things we need
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const uuid = require('uuid')
const validator = require('validator')
const { isEmail } = require('validator')
const arrayValidator = require('mongoose-array-validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const Address = {
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

const Controls = {
  _id: false,
  roleMappingAccess: {
    type: Boolean
  },
  allowRoleDepartmentMasterAccess: {
    type: Boolean
  },
  tokenManagementAccess: {
    type: Boolean
  }
}

const DepartmentId = {
  type: String,
  validate: {
    validator: (value) => validator.isUUID(value),
    message: 'departmentId is Invalid UUID'
  },
  ref: 'department'
}

const UserSchema = {
  userId: {
    type: String,
    unique: true,
    default: () => uuid.v4(),
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'userId is invalid UUID'
    }
  },
  userRoleId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'userRoleId is Invalid UUID'
    },
    ref: 'UserRole'
  },
  orgId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'orgId is invalid UUID'
    },
    ref: 'orgs'
  },
  roleId: {
    type: String,
    validate: {
      validator: (value) => validator.isUUID(value),
      message: 'roleId is Invalid UUID'
    },
    ref: 'roles'
  },
  departmentIds: {
    type: [DepartmentId],
    uniqueItems: true,
    minItems: 0
  },
  mobile: {
    type: String
  },
  email: {
    type: String,
    immutable: true,
    unique: true,
    validate: [isEmail, 'Enter valid email address'],
    lowercase: true,
    trim: true,
    required: true
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
  controls: {
    type: Controls
  },
  isActive: {
    type: Boolean,
    default: true
  },
  token: {
    type: String
  }
}

const schema = new Schema(UserSchema, {
  collection: 'users',
  timestamps: true
})

schema.plugin(mongoosePaginate)
schema.plugin(arrayValidator)

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

schema.path('userRoleId').validate(async (value) => {
  const { UserRoleModel } = require('./user.role.model')
  return await UserRoleModel.findOne({ userRoleId: value })
}, 'User role does not exist')
 
schema.path('roleId').validate(async (value) => {
  const { RolesModel } = require('./roles.model')
  return await RolesModel.findOne({ roleId: value })
}, 'role does not exist')


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

const processAssignUserRoleFlow = async (user, roleName) => {
  const { UserRoleModel } = require('./user.role.model')
  const { userRoleId } = await UserRoleModel.findOne({ name: roleName })
  user.userRoleId = userRoleId
}
 
schema.pre('save', async function (next) {
  try {
    const user = this
    await processUserPasswordFlow(user) 
    next()
  } catch (err) {
    next(err)
  }
})

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password)
}

schema.methods.generateToken = async function (jwt) {
  const { UserRoleModel } = require('./user.role.model')
  const user = this
  const data = user.toJSON()
  const userRole = await UserRoleModel.findOne({
    userRoleId: data.userRoleId
  })
  const { id, password, token, createdAt, updatedAt, ...userTokenInfo } = data
  const tokenData = {
    ...userTokenInfo,
    userRole: userRole?.name,
    userRoleId: userRole?.userRoleId
  }
  const $token = jwt.sign(tokenData)
  // user.token = token;
  // user.save();
  return $token
}

// schema.methods.findUserByToken = async function (jwt, token) {
//   const user = this;
//   const { token } = user.toJSON();
//   return token;
// };

schema.methods.deleteToken = async function () {
  const user = this
  return await user.update({ $unset: { session: 1 } })
}

const UserModel = mongoose.model('user', schema, 'users', { strict: true })

module.exports = { UserModel, UserSchema }
