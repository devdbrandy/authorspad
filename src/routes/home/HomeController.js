import ResponseHandler from '@helpers/responseHandler';
import { env } from '@helpers/utils';

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
    const appName = env('APP_NAME');
    return ResponseHandler.send(response, `Welcome to ${appName}`);
  }
}

export default HomeController;
