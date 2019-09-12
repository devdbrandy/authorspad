import ResponseHandler from '@helpers/response';
import Exception from '@helpers/exception';

const asyncWrapper = fn => (req, res, next) => fn(req, res, next).catch(next);

export default class BaseController {
  /**
   * Creates an instance of BaseController.
   *
   * @param {BaseService} service - The controller service to use
   * @memberof BaseController
   */
  constructor(service) {
    this.service = service;
    this.sendResponse = ResponseHandler.send;
    this.asyncWrapper = asyncWrapper;
  }

  /**
   * Defines the policy type for a specific resource
   *
   * @param {string} resourceName - The resource name to use
   * @param {string} foreignKey - The name of the foreign key in the resource
   * @memberof BaseController
   */
  resourcePolicy(resourceName) {
    return async (req, res, next) => {
      try {
        Exception.throwErrorIfNull(resourceName, 'Resource name is not defined', 500);

        const { params: { id, userId } } = req;
        let where = { id };

        if (req.originalUrl.includes('/users')) {
          where = { id, userId };
        }

        const resource = await this.service.find(where);
        Exception.throwErrorIfNull(resource);

        res.locals = Object.assign({}, res.locals, {
          resourceName,
          [resourceName]: resource,
        });

        next();
      } catch (err) {
        next(err);
      }
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
 * @typedef {import('@services/base-service').default} BaseService
 */
