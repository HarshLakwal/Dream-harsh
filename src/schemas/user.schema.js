const { httpResponse } = require('./shared.schema')
const Address = {
  addressLine1: {
    type: 'string'
  },
  addressLine2: {
    type: 'string'
  },
  city: {
    type: 'string'
  },
  state: {
    type: 'string'
  },
  zipCode: {
    type: 'string'
  },
  country: {
    type: 'string'
  }
}

const Controls = {
  roleMappingAccess: {
    type: 'boolean'
  },
  allowRoleDepartmentMasterAccess: {
    type: 'boolean'
  },
  tokenManagementAccess: {
    type: 'boolean'
  }
}

const MODEL = {
  // roleId: {
  //   type: "string",
  // },
  mobile: {
    type: 'string'
  },
  email: {
    type: 'string'
  },
  userRoleId: {
    type: 'string'
  },
  departmentIds: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  // orgId: {
  //   type: "string",
  // },
  firstName: {
    type: 'string'
  },
  lastName: {
    type: 'string'
  },
  avatar: {
    type: 'string'
  },
  address: {
    type: 'object',
    properties: { ...Address }
  },
  controls: {
    type: 'object',
    properties: { ...Controls }
  },
  isActive: {
    type: 'boolean'
  }
}
const RESPONSE_MODEL = {
  ...MODEL,
  userId: {
    type: 'string'
  },
  departmentIds: {
    type: 'array',
    items: {
      type: 'string'
    }
  }
}

const GET_ALL_QUERY_PARAMS = {
  roleId: {
    type: 'string'
  },
  departmentIds: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  mobile: {
    type: 'string'
  },
  email: {
    type: 'string'
  },
  userRoleId: {
    type: 'string'
  },
  orgId: {
    type: 'string'
  }
}

const PATCH_REQUEST_MODEL = {
  roleId: {
    type: 'string'
  },
  departmentIds: {
    type: 'array',
    items: {
      type: 'string'
    }
  },
  controls: {
    type: 'object',
    properties: { ...Controls }
  },
  mobile: {
    type: 'string'
  },
  email: {
    type: 'string'
  },
  userRoleId: {
    type: 'string'
  },
  orgId: {
    type: 'string'
  },
  isActive: {
    type: 'boolean'
  }
}

const POST = {
  description: 'This is an endpoint for creating a new User',
  tags: ['Users'],
  required: ['email'],
  body: {
    description: 'Payload for creating a new User',
    type: 'object',
    properties: {
      ...MODEL,
      password: {
        type: 'string'
      }
    }
  },
  response: httpResponse('POST', RESPONSE_MODEL)
}
const GET = {
  description: 'This is an endpoint for fetching an existing users',
  tags: ['Users'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' },
    ...GET_ALL_QUERY_PARAMS
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}
const GET_BY_ID = {
  description: 'This is an endpoint for fetching an existing users',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing User'
      }
    }
  },
  response: httpResponse('GET_BY_ID', RESPONSE_MODEL)
}
const GET_BY_EMAIL = {
  description: 'This is an endpoint for fetching an existing users',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'email of an existing User'
      }
    }
  },
  response: httpResponse('GET_BY_EMAIL', RESPONSE_MODEL)
}
const PUT = {
  description: 'This is an endpoint for updating an existing User',
  tags: ['Users'],
  required: ['name'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing User'
      }
    }
  },
  body: {
    description: 'Payload for updating an existing user',
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

const PATCH = {
  description: 'This is an endpoint for updating an existing user',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing user'
      }
    }
  },
  body: { ...PATCH_REQUEST_MODEL },
  response: httpResponse('PATCH', RESPONSE_MODEL)
}
const DELETE = {
  description: 'This is an endpoint for deleting an existing user',
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing User'
      }
    }
  },
  response: httpResponse('DELETE', RESPONSE_MODEL)
}
module.exports = { GET, GET_BY_ID, GET_BY_EMAIL, POST, PUT, PATCH, DELETE }
