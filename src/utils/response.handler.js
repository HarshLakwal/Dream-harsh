const httpResponseHandler = (result) => {
  return {
    data: result
  }
}

const httpResponseHandlerWithPagination = (result) => {
  const { totalDocs, docs, totalPages, page } = result
  return {
    totalItems: totalDocs || [],
    data: docs || [],
    totalPages: totalPages || 0,
    currentPage: page - 1 || 0
  }
}

module.exports = {
  httpResponseHandler,
  httpResponseHandlerWithPagination
}
