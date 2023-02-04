const { httpResponse } = require('./shared.schema')

const LOGIN = {
  description: 'Login using mobile and otp',
  tags: ['Auth'],
  required: ['mobile', 'otp'],
  body: {
    description: 'Payload for login',
    type: 'object',
    properties: {
      mobile: {
        type: 'number',
        default: ''
      },
      otp: {
        type: 'number',
        default: ''
      }
    }
  },
  response: httpResponse('POST', {
    token: {
      type: 'string'
    }
  })
}

const SIGN_UP = {
  description: 'register using mobile and otp',
  tags: ['Auth'],
  required: ['mobile', 'otp'],
  body: {
    description: 'Payload for register a new otp',
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
  response: httpResponse('POST', {
    message: {
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
module.exports = { LOGIN, SIGN_UP, LOGOUT }
