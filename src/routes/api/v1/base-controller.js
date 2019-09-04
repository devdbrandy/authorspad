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

  isOwnerPolicy(name) {
    return async (req, res) => {
      const { params: { id } } = req;
      const { user } = req;
      const resource = await this.service.getById(id);

      Exception.throwErrorIfNull(resource);

      res.locals = {
        ...res.locals,
        [name]: resource,
      };

      if (name === 'user') {
        return user.id === resource.id;
      }

      const policy = `has${capitalize(name)}`;
      return user[policy](resource);
    };
  }
}
