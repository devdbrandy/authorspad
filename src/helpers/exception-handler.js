import createError from 'http-errors';
import ResponseHandler from './response-handler';
import { messages } from './constants';

const { RESOURCE_NOT_FOUND, APP_SERVER_ERROR } = messages;

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
   * @param {Array.<string,number>} msg - A list of error message & code to display
   * @memberof ExceptionHandler
   */
  static throwHttpError(code, msg, errors) {
    const [message, errorCode] = msg;
    throw createError(code, message, { errorCode, errors });
  }

  /**
   * A middleware for handling exception. All errors are forwarded to this function
   *
   * @static
   * @returns {Function} - Express exception middleware
   * @memberof ExceptionHandler
   */
  static handleError() {
    return (error, req, res, next) => {
      if (res.headersSent) {
        return next(error);
      }
      return ExceptionHandler.sendErrorResponse(error, res);
    };
  }

  /**
   * Handler responsible for sending error response
   *
   * @static
   * @param {object} error - The Error object
   * @param {object} res - Express Response object
   * @returns {object} A defined response object
   * @memberof ExceptionHandler
   */
  static sendErrorResponse(error, res) {
    const {
      statusCode = 500,
      message,
      errorCode = APP_SERVER_ERROR[1],
      errors,
    } = error;
    return ResponseHandler.send(res, message, errors, statusCode, errorCode);
  }
}
