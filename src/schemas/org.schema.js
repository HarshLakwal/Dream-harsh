const { httpResponse } = require('./shared.schema')

const Token = {
  issued: {
    type: 'number',
    default: 0
  },
  assigned: {
    type: 'number',
    default: 0
  },
  consumed: {
    type: 'number',
    default: 0
  },
  deleted: {
    type: 'number',
    default: 0
  }
}
const language = {
  name: {
    type: 'string'
  },
  code: {
    type: 'string'
  },
  langId: {
    type: 'string'
  }
}
const OrgUser = {
  primaryEmail: {
    // it will be consider as an Org Admin Email
    type: 'string'
  }
}

// flag those are available in the org and needs to confirm
const Controls = {
  developmentRoomEnabled: {
    type: 'boolean'
  },
  sfiaEnabled: {
    type: 'boolean'
  },
  hybridEnabled: {
    type: 'boolean'
  },
  roleBuilderEnabled: {
    type: 'boolean'
  },
  verifiersListEnabled: {
    type: 'boolean'
  },
  careerPathVisibilityToEmployees: {
    type: 'boolean'
  }
}

const MODEL = {
  name: {
    type: 'string'
  },
  // token: { // will expose another org api to do operation related to org token
  //   type: "object",
  //   properties: {
  //     ...Token,
  //   },
  // },
  startDate: {
    type: 'string'
  },
  expiryDate: {
    type: 'string'
  },
  orgUser: {
    type: 'object',
    properties: {
      ...OrgUser
    }
  },
  // controls: { // consider, patch api to update these details
  //   type: "object",
  //   properties: {
  //     ...Controls,
  //   },
  // },
  isActive: {
    type: 'boolean'
  },
  type: {
    type: 'string',
    enum: ['SFIA', 'SFIA_EXTRA']
  },
  systemLanguage: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        ...language
      }
    }
  }
}

const RESPONSE_MODEL = {
  ...MODEL,
  logo: {
    type: 'string',
    format: 'binary'
  },
  ...{
    token: {
      type: 'object',
      properties: { ...Token }
    }
  },
  ...{
    controls: {
      type: 'object',
      properties: { ...Controls }
    }
  },
  orgId: {
    type: 'string'
  }
}

const PATCH_REQUEST_MODEL = {
  ...Controls,
  ...OrgUser,
  ...language,
  logo: {
    type: 'string',
    format: 'binary'
  },
  isActive: {
    type: 'boolean'
  }
}

const GET = {
  description: 'This is an endpoint for fetching an existing Orgs',
  tags: ['Orgs'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' }
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}
const GET_BY_ID = {
  description: 'This is an endpoint for fetching an existing Orgs',
  tags: ['Orgs'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Org'
      }
    }
  },
  response: httpResponse('GET_BY_ID', RESPONSE_MODEL)
}
const POST = {
  description: 'This is an endpoint for creating a new Org',
  tags: ['Orgs'],
  required: ['name'],
  body: {
    description: 'Payload for creating a new Org',
    type: 'object',
    properties: MODEL
  },
  response: httpResponse('POST', RESPONSE_MODEL)
}
const PUT = {
  description: 'This is an endpoint for updating an existing Org',
  tags: ['Orgs'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Org'
      }
    }
  },
  required: ['name'],
  body: {
    description: 'Payload for updating an existing Org',
    type: 'object',
    properties: MODEL
  },
  response: httpResponse('PUT', RESPONSE_MODEL)
}
const PATCH = {
  description: 'This is an endpoint for updating an existing Org',
  tags: ['Orgs'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing Org'
      }
    }
  },
  querystring: { ...PATCH_REQUEST_MODEL },
  response: httpResponse('PATCH', RESPONSE_MODEL)
}
const DELETE = {
  description: 'This is an endpoint for deleting an existing Org',
  tags: ['Orgs'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing org'
      }
    }
  },
  response: httpResponse('DELETE', RESPONSE_MODEL)
}

module.exports = {
  GET,
  GET_BY_ID,
  POST,
  PUT,
  PATCH,
  DELETE,
  MODEL: RESPONSE_MODEL
}
