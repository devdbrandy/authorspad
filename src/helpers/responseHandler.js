export default class ResponseHandler {
  /**
   * Handles http response
   *
   * @static
   * @param {object} response - Express Response object
   * @param {string|Array} message- The response message to be displayed
   * @param {object|Array} [data={}] - The data to be displayed
   * @param {number} [code=200] - The http status code
   * @param {number} [errorCode=null] - Code to indicate if there was an error
   * @returns
   * @memberof ResponseHandler
   */
  static send(response, message, data = {}, code = 200, errorCode = null) {
    const msg = Array.isArray(message) ? message[0] : message;
    const failurePayload = errorCode ? { errorCode } : {};

    return response.status(code)
      .json({
        success: !errorCode,
        message: msg,
        data,
        ...failurePayload,
      });
  }
}
