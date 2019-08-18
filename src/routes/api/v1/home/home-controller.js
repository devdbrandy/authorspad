import { messages } from '@helpers/constants';
import BaseController from '../base-controller';

class HomeController extends BaseController {
  /**
   * Loads the homepage (index)
   *
   * @static
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @memberof HomeController
   */
  index() {
    return (req, res) => {
      const { WELCOME_MESSAGE } = messages;
      this.sendResponse(res, undefined, WELCOME_MESSAGE);
    };
  }
}

export default new HomeController();
