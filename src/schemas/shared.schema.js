const paginations = {
  currentPage: {
    type: 'number'
  },
  totalPages: {
    type: 'number'
  },
  totalItems: {
    type: 'number'
  }
}

const modifications = {
  acknowledged: {
    type: 'boolean'
  },
  deletedCount: {
    type: 'number'
  },
  modifiedCount: {
    type: 'number'
  },
  upsertedId: {
    type: 'string'
  },
  upsertedCount: {
    type: 'number'
  },
  matchedCount: {
    type: 'number'
  }
}

const getResponseWithTypeByMethod = (method, modelSchema) => {
  switch (method) {
    case 'GET_BY_ID':
    case 'GET_BY_EMAIL':
    case 'POST':
      return {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: { ...modelSchema }
          }
        }
      }
    case 'POST_BULK':
      return {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: { ...modelSchema }
            }
          }
        }
      }
    case 'GET':
      return {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: { ...modelSchema }
            }
          },
          ...paginations
        }
      }

    case 'PUT':
    case 'PATCH':
      return {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              ...modifications
            }
          }
        }
      }
    case 'DELETE':
      return {
        type: 'object',
        properties: {
          ...modifications
        }
      }
  }
}

const errorResponse = (message, code) => {
  return {
    message: {
      type: 'string',
      default: message
    },
    code: {
      type: 'number',
      default: code
    }
  }
}

const httpResponse = (method, modelSchema) => {
  const response = getResponseWithTypeByMethod(method, modelSchema)
  return {
    200: {
      description: 'Success Response',
      ...response,
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' }
    },
    400: {
      description: 'Bad Request',
      type: 'object',
      properties: {
        ...errorResponse('Bad Request', 400)
      }
    },
    401: {
      description: 'Not Authorized',
      type: 'object',
      properties: {
        ...errorResponse('Not Authorized', 401)
      }
    },
    404: {
      description: 'Resource Not Found',
      type: 'object',
      properties: {
        ...errorResponse('Resource Not Found', 404)
      }
    },
    500: {
      description: 'Internal Server Error',
      type: 'object',
      properties: {
        ...errorResponse('Internal Server Error', 500)
      }
    }
  }
}

module.exports = {
  httpResponse
}
