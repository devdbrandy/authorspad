import { cleanData } from '@helpers/utils';

export default class ResponseHandler {
  /**
   * Handles http response
   *
   * @static
   * @param {object} res - Express Response object
   * @param {string|Array} message- The response message to be displayed
   * @param {object|Array} data - The data to be displayed
   * @param {number} [code=200] - The http status code
   * @param {number} errorCode - Code to indicate if there was an error
   * @returns
   * @memberof ResponseHandler
   */
  static send(res, message, data, code = 200, errorCode) {
    const msg = Array.isArray(message) ? message[0] : message;
    const payload = errorCode ? 'errors' : 'data';
    const failurePayload = errorCode ? { errorCode } : {};

    return res.status(code).json(cleanData({
      success: !errorCode,
      message: msg,
      [payload]: data,
      ...failurePayload,
    }));
  }
}
