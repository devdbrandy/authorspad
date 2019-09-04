import ExceptionHandler from '@helpers/exception';
import UserService from '@services/user-service';
import JWTService from '@services/jwt-service';
import BaseController from '../base-controller';

/**
 * This is the main class representing UsersController
 *
 * @class UsersController
 * @extends {BaseController}
 */
class UsersController extends BaseController {
  /**
   * Fetch a list of users
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UsersController
   */
  getAllUsers() {
    return this.asyncWrapper(async (req, res) => {
      const users = await this.service.getAll();
      this.sendResponse(res, { users });
    });
  }

  /**
   * Fetch a specific user by `id`
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UsersController
   */
  getUser() {
    return this.asyncWrapper(async (req, res) => {
      const { params: { id: userId } } = req;
      const user = await this.service.getById(userId);
      ExceptionHandler.throwErrorIfNull(user);
      this.sendResponse(res, { user });
    });
  }

  /**
   * Create a new user
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UsersController
   */
  createUser() {
    return this.asyncWrapper(async (req, res) => {
      const { body } = req;
      const user = await this.service.create(body, { plain: true });
      const { id, username } = user;
      const token = JWTService.sign({ id, username });

      res.header('X-Auth-Token', token);
      this.sendResponse(res, { user }, undefined, 201);
    });
  }

  /**
   * Update a user resource
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UsersController
   */
  updateUser() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: userId },
      } = req;
      const user = await this.service.update(userId, body);
      this.sendResponse(res, { user });
    });
  }

  /**
   * Remove a specific user
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof UsersController
   */
  destroyUser() {
    return this.asyncWrapper(async (req, res) => {
      const { locals: { user } } = res;
      await user.destroy();
      this.sendResponse(res, null, null, 204);
    });
  }
}

export default new UsersController(UserService);
