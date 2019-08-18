import createError from 'http-errors';
import { DatabaseError } from 'sequelize';
import Response from '@helpers/response';
import { messages } from './constants';

const { RESOURCE_NOT_FOUND } = messages;

export default class Exception {
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
      throw createError(404, message);
    }
    return true;
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
      return Response.sendError(res, error);
    };
  }

  /**
   * A middleware for handling database errors
   *
   * @static
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof Exception
   */
  static handleDatabaseError() {
    return (error, req, res, next) => {
      if (error instanceof DatabaseError) {
        error.statusCode = 503;
        return Response.sendError(res, error);
      }
      return next(error);
    };
  }
}
