const ResponseHandler = require('../../helpers/responseHandler');

class HomeController {
  /**
   * Loads the homepage (index)
   *
   * @static
   * @param {object} request - Express Request object
   * @param {object} response - Express Response object
   * @memberof HomeController
   */
  static index(request, response) {
    return ResponseHandler.send(response, 'Welcome to iRobot');
  }
}

module.exports = HomeController;
