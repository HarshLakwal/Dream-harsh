module.exports = Object.freeze({
  SUPER_ADMIN: {
    roles: ['POST', 'PUT', 'PATCH', 'DELETE'],
    department: ['POST', 'PUT', 'PATCH', 'DELETE'],
    orgs: ['PUT', 'PATCH']
  },
  ORG_ADMIN: {
    skills: ['POST', 'PUT', 'PATCH', 'DELETE'],
    category: ['POST', 'PUT', 'PATCH', 'DELETE'],
    attributes: ['POST', 'PUT', 'PATCH', 'DELETE'],
    guide: ['POST', 'PUT', 'PATCH', 'DELETE'],
    orgs: ['POST', 'DELETE']
  }
})
