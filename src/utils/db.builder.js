const { isEmptyObject, flatProperties } = require('./utils')

const buildPatchQuery = (data, model = {}) => {
  const buildQueryWithValidation = (data, model) => {
    const query = {}
    const flattenModel = flatProperties(model)
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(flattenModel, key)) {
        // key validation
        query[key] = data[key]
      }
    }
    return query
  }

  const buildQuery = (data) => {
    const query = {}
    for (const key in data) {
      query[key] = data[key]
    }
    return query
  }

  const query = isEmptyObject(model)
    ? buildQuery(data)
    : buildQueryWithValidation(data, model)

  // if (Object.keys(query).length > 5) {
  //   throw new IOError("Please use post/put method instead of patch", {
  //     statusCode: 400,
  //   });
  // }
  return { $set: query }
}

const getPagination = (page, size) => {
  // TODO: need to get per page limit from app-configs;
  const PER_PAGE_LIMIT = 20
  const limit = size ? +size : PER_PAGE_LIMIT
  const offset = page ? page * limit : 0
  return { limit, offset }
}

const buildGetDataQuery = (data) => {
  const { page, size, ...rest } = data
  return rest
}

module.exports = {
  buildPatchQuery,
  getPagination,
  buildGetDataQuery
}
