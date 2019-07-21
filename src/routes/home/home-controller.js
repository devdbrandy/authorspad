import ResponseHandler from '@helpers/response-handler';
import { env } from '@helpers/utils';

class HomeController {
  /**
   * Loads the homepage (index)
   *
   * @static
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @memberof HomeController
   */
  static index(req, res) {
    const appName = env('APP_NAME');
    return ResponseHandler.send(res, `Welcome to ${appName}`);
  }
}

export default HomeController;
