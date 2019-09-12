import ExceptionHandler from '@helpers/exception';
import RoleService from '@services/role-service';
import BaseController from '../base-controller';

/**
 * This is the main class representing RolesController
 *
 * @class RolesController
 * @extends {BaseController}
 */
class RolesController extends BaseController {
  /**
   * Fetch a list of roles
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof RolesController
   */
  getAllRoles() {
    return this.asyncWrapper(async (req, res) => {
      const roles = await this.service.getAll();
      this.sendResponse(res, { roles });
    });
  }

  /**
   * Fetch a specific role by `id`
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof RolesController
   */
  getRole() {
    return this.asyncWrapper(async (req, res) => {
      const { params: { id: roleId } } = req;
      const role = await this.service.getById(roleId);

      ExceptionHandler.throwErrorIfNull(role);

      this.sendResponse(res, { role });
    });
  }

  /**
   * Create a new role
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof RolesController
   */
  createRole() {
    return this.asyncWrapper(async (req, res) => {
      const { body } = req;
      const role = await this.service.create(body);

      this.sendResponse(res, { role }, undefined, 201);
    });
  }

  /**
   * Update a specific role
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof RolesController
   */
  updateRole() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: roleId },
      } = req;
      const role = await this.service.update(roleId, body);
      this.sendResponse(res, { role });
    });
  }

  /**
   * Remove a specific role
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof RolesController
   */
  destroyRole() {
    return this.asyncWrapper(async (req, res) => {
      const { params: { id } } = req;
      const role = await this.service.getById(id);

      await role.setPermissions([]);
      await role.destroy();

      this.sendResponse(res, null, null, 204);
    });
  }
}

export default new RolesController(RoleService);
