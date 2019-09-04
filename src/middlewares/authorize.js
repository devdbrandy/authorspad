import createError from 'http-errors';
import JWTService from '@services/jwt-service';
import UserService from '@services/user-service';
import { messages } from '@helpers/constants';
import Exception from '@helpers/exception';

const {
  NO_AUTH_TOKEN,
  INVALID_AUTH_TOKEN,
  INVALID_TOKEN_FORMAT,
  ACCESS_DENIED,
} = messages;

export default class AuthGuard {
  /**
   * A middleware to determine if the request is made by an authenticated user
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   * @param {Function} next - Calls the next middleware function in the stack
   * @returns {object} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static async authenticateGuard(req, res, next) {
    const authHeader = req.header('Authorization');

    try {
      Exception.throwErrorIfNull(authHeader, NO_AUTH_TOKEN, 403);

      if (!authHeader.startsWith('Bearer')) {
        throw createError(401, INVALID_TOKEN_FORMAT);
      }

      const [, token] = authHeader.split(' ');
      const decoded = JWTService.verify(token);

      Exception.throwErrorIfNull(decoded, INVALID_AUTH_TOKEN, 403);

      req.user = await UserService.getById(decoded.id);
      next();
    } catch (err) {
      next(err);
    }
  }

  /**
   * A middlware that guards against user access control
   *
   * @static
   * @param {AuthPolicy[]} [policies=[]] - The authorization policy
   * @memberof AuthGuard
   */
  static can(policies = []) {
    return [AuthGuard.authenticateGuard, AuthGuard.authorizeGuard(policies)];
  }

  /**
   * A middleware to determine if a user is authorized to access a resource
   *
   * @param {AuthPolicy[]} [policies=[]] - The authorization policy
   * @returns {Function} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static authorizeGuard(policies) {
    return async (req, res, next) => {
      const { user } = req;

      try {
        if (user && policies.length) {
          const access = await AuthGuard.checkPolicy(req, res, policies);
          if (access.indexOf(true) >= 0) {
            return next();
          }
        }

        return next(createError(403, ACCESS_DENIED));
      } catch (err) {
        return next(err);
      }
    };
  }

  /**
   * Determine the user access privilege
   *
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   * @param {AuthPolicy[]} [policies=[]] - The authorization policy
   * @returns {Function} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static async checkPolicy(req, res, policies) {
    const promises = policies.map((policy) => {
      if (policy.when) {
        return policy.when(req, res);
      }
      return true;
    });
    const access = await Promise.all(promises);
    return access;
  }
}


/*
|--------------------------------------------------------------------------
| Types definition
|--------------------------------------------------------------------------
|
| Useful for documenting custom types, allowing us to provide a type
| expression identifying the type of value that a symbol may contain
|
*/

/**
 * @typedef {object} AuthPolicy
 * @property {string} role - The user role
 * @property {boolean} when - A funtion that returns a boolean based on a condition
 */
