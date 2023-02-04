/**
 * @name Errors
 * @description Common error types for apps
 * @module Errors
 */

/** Represents an error which occurs during IO operations */
class IOError extends Error {
  constructor (message, { originalError, statusCode, errorCode, context } = {}) {
    if (!message || typeof message !== 'string') {
      throw new Error('The message argument is required as string')
    }
    super(message)
    this.errorMessage = message
    if (originalError) {
      if (!(originalError instanceof Error)) {
        throw new Error(
          'The originalError argument has to be an Error instance'
        )
      }
      this.originalError = originalError
    }
    if (statusCode) {
      if (!/^[3-5][0-9][0-9]$/.test(statusCode)) {
        throw new Error(
          'The statusCode argument has to be an http error code (3XX|4XX|5XX)'
        )
      }
      this.statusCode = statusCode
    }
    if (errorCode) {
      if (typeof errorCode !== 'string') {
        throw new Error('The errorCode argument has to be a string')
      }
      this.errorCode = errorCode
    }
    if (context) {
      if (context.constructor !== Object) {
        throw new Error('The context argument has to be an object')
      }
      this.context = context
    }
    this.name = 'IOError'
  }
}
module.exports = { IOError }
