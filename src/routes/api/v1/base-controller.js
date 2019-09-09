import ResponseHandler from '@helpers/response';
import Exception from '@helpers/exception';
import { capitalize } from '@helpers/utils';

const asyncWrapper = fn => (req, res, next) => fn(req, res, next).catch(next);

/**
* @typedef {import('@services/base-service').default} BaseService
*/

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
  isOwnerPolicy(resourceName, foreignKey) {
    return async (req, res) => {
      const { params: { id, userId } } = req;
      const { user } = req;
      let where = { id };

      if (foreignKey && (req.originalUrl.includes('/users'))) {
        where = { id, [foreignKey]: userId };
      }

      const resource = await this.service.find(where);
      Exception.throwErrorIfNull(resource);

      res.locals = {
        ...res.locals,
        [resourceName]: resource,
      };

      if (resourceName === 'user') {
        return (user.id === resource.id);
      }

      const policy = `has${capitalize(resourceName)}`;
      return user[policy](resource);
    };
  }
}
