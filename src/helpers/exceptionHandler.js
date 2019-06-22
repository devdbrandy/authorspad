import createError from 'http-errors';
import ResponseHandler from './responseHandler';
import { MESSAGES } from './constants';

const { RESOURCE_NOT_FOUND, APP_SERVER_ERROR } = MESSAGES;

export default class ExceptionHandler {
  /**
   * Validates that a given data is valid, else throws exception
   *
   * @static
   * @param {object|string|number} data - The specific data to validate
   * @param {Array} [message=RESOURCE_NOT_FOUND] - A list of error message & code to display
   * @memberof ExceptionHandler
   */
  static throwErrorIfNull(data, message = RESOURCE_NOT_FOUND) {
    if (!data || data === -1) {
      this.throwHttpError(404, message);
    }
  }

  /**
   * A wrapper for creating Http error
   *
   * @static
   * @param {number} code - The hhtp error code
   * @param {Array.<string,number>} responseMessage - A list of error message & code to display
   * @memberof ExceptionHandler
   */
  static throwHttpError(code, responseMessage) {
    const [message, errorCode] = responseMessage;
    throw createError(code, message, { errorCode });
  }

  /**
   * A middleware for handling exception. All errors are forwarded to this function
   *
   * @static
   * @returns {Function} - Express exception middleware
   * @memberof ExceptionHandler
   */
  static handleError() {
    return (error, request, response) => {
      ExceptionHandler.sendErrorResponse(error, response);
    };
  }

  /**
   * Handler responsible for sending error response
   *
   * @static
   * @param {object} error - The Error object
   * @param {object} response - Express Response object
   * @returns {object} A defined response object
   * @memberof ExceptionHandler
   */
  static sendErrorResponse(error, response) {
    const {
      statusCode = 500,
      message,
      errorCode = APP_SERVER_ERROR[1],
    } = error;
    return ResponseHandler.send(response, message, {}, statusCode, errorCode);
  }
}
