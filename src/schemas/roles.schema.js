const { httpResponse } = require('./shared.schema')

const MODEL = {
  name: { type: 'string' },
  description: { type: 'string' },
  isActive: { type: 'boolean', default: true },
  orgId: {
    type: 'string'
  }
}

const GET_ALL_QUERY_PARAMS = {
  name: {
    type: 'string'
  },
  orgId: {
    type: 'string'
  }
}

const RESPONSE_MODEL = { ...MODEL, roleId: { type: 'string' } }

const POST = {
  description: 'This is an endpoint for creating a new Roles',
  tags: ['Roles'],
  required: ['email'],
  body: {
    description: 'Payload for creating a new Roles',
    type: 'object',
    properties: MODEL
  },
  response: httpResponse('POST', RESPONSE_MODEL)
}
const GET = {
  description: 'This is an endpoint for fetching an existing roles',
  tags: ['Roles'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' },
    ...GET_ALL_QUERY_PARAMS
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}
const GET_BY_ID = {
  description: 'This is an endpoint for fetching an existing roles',
  tags: ['Roles'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Roles'
      }
    }
  },
  response: httpResponse('GET_BY_ID', RESPONSE_MODEL)
}
const PUT = {
  description: 'This is an endpoint for updating an existing Roles',
  tags: ['Roles'],
  required: ['name'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Roles'
      }
    }
  },
  body: {
    description: 'Payload for updating an existing roles',
    type: 'object',
    properties: MODEL
  },
  response: httpResponse('PUT', RESPONSE_MODEL)
}
const DELETE = {
  description: 'This is an endpoint for deleting an existing Roles',
  tags: ['Roles'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Roles'
      }
    }
  },
  response: httpResponse('DELETE', RESPONSE_MODEL)
}
module.exports = { GET, GET_BY_ID, POST, PUT, DELETE }
