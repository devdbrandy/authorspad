import ExceptionHandler from '@helpers/exception-handler';
import { messages } from '@helpers/constants';
import UserService from '@services/user-service';
import BaseController from '../base-controller';

const {
  RESOURCE_FOUND,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} = messages;

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
    return async (req, res, next) => {
      try {
        const users = await this.service.findAll();
        this.sendResponse(res, RESOURCE_FOUND, { users });
      } catch (error) {
        next(error);
      }
    };
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
    return async (req, res, next) => {
      try {
        const { params: { id: userId } } = req;
        const user = await this.service.findById(userId);
        ExceptionHandler.throwErrorIfNull(user);
        this.sendResponse(res, RESOURCE_FOUND, { user });
      } catch (error) {
        next(error);
      }
    };
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
    return async (req, res, next) => {
      try {
        const { body } = req;
        const user = await this.service.create(body);
        this.sendResponse(res, CREATE_SUCCESS, { user }, 201);
      } catch (error) {
        next(error);
      }
    };
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
    return async (req, res, next) => {
      try {
        const {
          body,
          params: { id: userId },
        } = req;
        await this.service.update(userId, body);
        this.sendResponse(res, UPDATE_SUCCESS);
      } catch (error) {
        next(error);
      }
    };
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
    return async (req, res, next) => {
      try {
        const { params: { id: userId } } = req;
        await this.service.delete(userId);
        this.sendResponse(res, DELETE_SUCCESS, null, 200);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default new UsersController(UserService);
