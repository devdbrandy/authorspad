export default class Response {
  /**
   * Handles http response
   *
   * @static
   * @param {object} res - Express response object
   * @param {object} date - The response payload (data resource)
   * @param {string} message - The response message
   * @param {number} code - The response status code
   * @returns {object} HTTP response
   * @memberof Response
   */
  static send(res, data, message, code = 200) {
    return res.status(code).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send http error response
   *
   * @static
   * @param {object} res - Express response object
   * @param {object} error - Error object
   * @returns {object} HTTP error response
   * @memberof Response
   */
  static sendError(res, error) {
    const {
      statusCode = 500,
      message,
      errors,
    } = error;

    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}
