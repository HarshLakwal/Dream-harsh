const { httpResponse } = require('./shared.schema')

const MODEL = {
  mobile: {
    type: 'string'
  },
  email: {
    type: 'string',
  },
  password: {
    type: 'string'
  },
  firstName: {
    type: 'string'
  },
  lastName: {
    type: 'string'
  },
  avatar: {
    type: 'string'
  },
  isActive: {
    type: 'boolean',
    default: true
  },
  isDeleted:{
    type:'boolean',
    default:false
  },
  isPasswordSet:{
    default:false,
    type:'boolean'
  },
  isEmailSet:{
    default:false,
    type:'boolean'
  }
  
}

const RESPONSE_MODEL = {
  ...MODEL,
  playertId: {
    type: 'string'
  }
}

const GET_ALL_QUERY_PARAMS = { 
  mobile: {
    type: 'string'
  },
  email: {
    type: 'string'
  },
  playertId: {
    type: 'string'
  } 
}

const POST = {
  description: 'This is an endpoint for creating a new player',
  tags: ['Player'],
  required: ['mobile'],
  body: {
    description: 'Payload for creating a new player',
    type: 'object',
    properties: {
      ...MODEL
    }
  },
  response: httpResponse('POST', RESPONSE_MODEL)
}

const GET = {
  description: 'This is an endpoint for fetching an existing players',
  tags: ['Players'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' },
    ...GET_ALL_QUERY_PARAMS
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}

const GET_BY_ID = {
  description: 'This is an endpoint for fetching an existing player',
  tags: ['Player'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Player'
      }
    }
  },
  response: httpResponse('GET_BY_ID', RESPONSE_MODEL)
}

const GET_BY_EMAIL = {
  description: 'This is an endpoint for fetching an existing player',
  tags: ['Player'],
  params: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'email of an existing Player'
      }
    }
  },
  response: httpResponse('GET_BY_EMAIL', RESPONSE_MODEL)
}

const PUT = {
  description: 'This is an endpoint for updating an existing Player',
  tags: ['Player'],
  required: ['name'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing player'
      }
    }
  },
  body: {
    description: 'Payload for updating an existing player',
    type: 'object',
    properties: {
      ...MODEL,
      password: {
        type: 'string'
      }
    }
  },
  response: httpResponse('PUT', RESPONSE_MODEL)
}

const DELETE = {
  description: 'This is an endpoint for deleting an existing player',
  tags: ['Player'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Player'
      }
    }
  },
  response: httpResponse('DELETE', RESPONSE_MODEL)
}


module.exports = { GET, GET_BY_ID, GET_BY_EMAIL, POST, PUT, DELETE }
