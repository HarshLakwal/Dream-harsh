const { httpResponse } = require('./shared.schema')

const MODEL = {
  name: {
    type: 'string',
    enum: ['SUPER_ADMIN', 'ORG_ADMIN', 'VERIFIER', 'EMPLOYEE']
  }
}
const RESPONSE_MODEL = { ...MODEL, userRoleId: { type: 'string' } }
// const POST = {
//   description: "This is an endpoint for creating a new UserRole",
//   tags: ["User-Roles"],
//   required: ["name"],
//   body: {
//     description: "Payload for creating a new UserRole",
//     type: "object",
//     properties: MODEL,
//   },
//   response: httpResponse("POST", RESPONSE_MODEL),
// };
const GET = {
  description: 'This is an endpoint for fetching an existing userRoles',
  tags: ['User-Roles'],
  querystring: {
    page: { type: 'number' },
    size: { type: 'number' }
  },
  response: httpResponse('GET', RESPONSE_MODEL)
}
const GET_BY_ID = {
  description: 'This is an endpoint for fetching an existing userRoles',
  tags: ['User-Roles'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Id of an existing UserRole'
      }
    }
  },
  response: httpResponse('GET_BY_ID', RESPONSE_MODEL)
}
// const PUT = {
//   description: "This is an endpoint for updating an existing UserRole",
//   tags: ["User-Roles"],
//   required: ["name"],
//   params: {
//     type: "object",
//     properties: {
//       id: {
//         type: "string",
//         description: "Id of an existing UserRole",
//       },
//     },
//   },
//   body: {
//     description: "Payload for updating an existing user",
//     type: "object",
//     properties: MODEL,
//   },
//   response: httpResponse("PUT", RESPONSE_MODEL),
// };
// const DELETE = {
//   description: "This is an endpoint for deleting an existing UserRole",
//   tags: ["User-Roles"],
//   params: {
//     type: "object",
//     properties: {
//       id: {
//         type: "string",
//         description: "Id of an existing UserRole",
//       },
//     },
//   },
//   response: httpResponse("DELETE", RESPONSE_MODEL),
// };
module.exports = { GET, GET_BY_ID }
