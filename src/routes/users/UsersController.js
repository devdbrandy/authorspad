import ResponseHandler from '@helpers/responseHandler';
import ExceptionHandler from '@helpers/exceptionHandler';
import { messages } from '@helpers/constants';
import users from '../../utils/data';

const {
  RESOURCE_FOUND,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} = messages;

class UsersController {
  /**
   * Fetch a list of users
   *
   * @static
   * @param {object} request - Express Request object
   * @param {object} response - Express Response object
   * @memberof UsersController
   */
  static getAllUsers(request, response) {
    return ResponseHandler.send(response, RESOURCE_FOUND, users);
  }

  /**
   * Fetch a specific user by `id`
   *
   * @static
   * @param {object} request - Express Request object
   * @param {object} response - Express Response object
   * @memberof UsersController
   */
  static getUser(request, response) {
    const { params: { id: userId } } = request;
    const userData = users.find(user => user.id === parseInt(userId, 10));
    ExceptionHandler.throwErrorIfNull(userData);
    return ResponseHandler.send(response, RESOURCE_FOUND, userData);
  }

  /**
   * Create a new user
   *
   * @static
   * @param {object} request - Express Request object
   * @param {object} response - Express Response object
   * @memberof UsersController
   */
  static createUser(request, response) {
    const { body } = request;
    const user = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
    };
    users.push(user);
    return ResponseHandler.send(response, CREATE_SUCCESS, user);
  }

  /**
   * Create a new user
   *
   * @static
   * @param {object} request - Express Request object
   * @param {object} response - Express Response object
   * @memberof UsersController
   */
  static updateUser(request, response) {
    const { body, params: { id } } = request;
    const userId = parseInt(id, 10);
    const userIndex = users.findIndex(user => user.id === userId);
    ExceptionHandler.throwErrorIfNull(userIndex);

    users[userIndex] = {
      id: userId,
      name: body.name,
      email: body.email,
    };
    const user = users[userIndex];
    return ResponseHandler.send(response, UPDATE_SUCCESS, user);
  }

  /**
   * Remove a specific user
   *
   * @static
   * @param {object} request - Express Request object
   * @param {object} response - Express Response object
   * @memberof UsersController
   */
  static destroyUser(request, response) {
    const { params: { id } } = request;
    const userId = parseInt(id, 10);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== 0) ExceptionHandler.throwErrorIfNull(userIndex);

    users.splice(userIndex, 1);
    return ResponseHandler.send(response, DELETE_SUCCESS, {});
  }
}

export default UsersController;
