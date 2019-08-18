import ResponseHandler from '@helpers/response';

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
}
