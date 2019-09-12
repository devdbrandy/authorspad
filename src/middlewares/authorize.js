import createError from 'http-errors';
import JWTService from '@services/jwt-service';
import RoleService from '@services/role-service';
import RBAC from '@modules/rbac';
import Exception from '@helpers/exception';
import { messages } from '@helpers/constants';
import userService from '@services/user-service';

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

      const authUser = await userService.getByEmailOrUsername(decoded.username);
      Exception.throwErrorIfNull(authUser, INVALID_AUTH_TOKEN, 403);

      res.locals = Object.assign({}, res.locals, { authUser });
      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  }

  /**
   * A middlware that guards against user access control
   *
   * @static
   * @param {string} operation - The allowed permission
   * @param {Function} resourceMiddlware - The resource policy middleware
   * @return {Function[]} A list of middleware
   * @memberof AuthGuard
   */
  static can(operation, resourceMiddlware = (req, res, next) => next()) {
    return [
      AuthGuard.authenticateGuard,
      resourceMiddlware,
      AuthGuard.authorizeGuard(operation),
    ];
  }

  /**
   * A middleware to determine if a user is authorized to access a resource
   *
   * @param {string} operation - The allowed permission
   * @returns {Function} HTTP response or moves to the next middleware
   * @memberof AuthGuard
   */
  static authorizeGuard(operation) {
    return async (req, res, next) => {
      const { user } = req;
      const [userRole] = user.roles;

      const rolesOption = await RoleService.getAll();
      const rbac = new RBAC(rolesOption);

      const { locals: { resourceName } } = res;
      const resource = res.locals[resourceName];

      if (resourceName === 'user') {
        resource.userId = resource.id;
      }

      if (rbac.can(userRole, operation, { user, resource })) {
        return next();
      }

      return next(createError(403, ACCESS_DENIED));
    };
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
