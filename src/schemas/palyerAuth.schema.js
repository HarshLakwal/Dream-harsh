const { httpResponse } = require('./shared.schema')

const RESPONSE_MODEL = {
  isPasswordSet: {
    default: false,
    type: 'boolean'
  },
  isEmailSet: {
    default: false,
    type: 'boolean'
  },
  isDeleted: {
    default: false,
    type: 'boolean'
  },
  isActive: {
    default: false,
    type: 'boolean'
  }
}

const AUTHENTICATION = {
  description: 'send otp using mobile',
  tags: ['PlayerAuth'],
  required: ['mobile'],
  body: {
    description: 'Payload for authentication',
    type: 'object',
    properties: {
      mobile: {
        type: 'number',
        default: ''
      }
    }
  },
  response: httpResponse('POST', {
    message: {
      type: 'string'
    },
    ...RESPONSE_MODEL
  })
}

const AUTHORIZATION = {
  description: 'authorize using mobile number and otp',
  tags: ['PlayerAuth'],
  required: ['mobile', 'otp'],
  body: {
    description: 'Payload for creating a new Org',
    type: 'object',
    properties: {
      mobile: {
        type: 'string'
      },
      otp: {
        type: 'string'
      }
    },
    additionalProperties: false
  },
  response: httpResponse('POST',   {
    token: {
      type: 'string'
    }
  }) 
}

const LOGOUT = {
  description: 'Logout of an player',
  tags: ['Auth'],
  headers: {
    type: 'object',
    description: 'Payload for player token',
    properties: {
      token: {
        type: 'string'
      }
    }
  },
  response: httpResponse('POST', {
    message: {
      type: 'string'
    }
  })
}
module.exports = { AUTHENTICATION, AUTHORIZATION, LOGOUT }
