import ResponseHandler from '@helpers/response-handler';

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
  }
}
