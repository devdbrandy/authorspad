import models from '@database/models';
import BaseService from './base-service';

const { Role, Permission } = models;

class RoleService extends BaseService {
  /**
   * Get a list of roles
   *
   * @param {object} options - Query options
   * @returns {Array} List of users
   * @memberof RoleService
   */
  async getAll() {
    const rows = await super.getAll({
      include: [
        {
          model: Role,
          as: 'parentRole',
          attributes: { exclude: ['id', 'parent'] },
          include: [...RoleService.includePermissions()],
        },
        ...RoleService.includePermissions(),
      ],
      attributes: { exclude: ['parent'] },
      plain: true,
    });

    return RoleService.serializeData(rows);
  }

  /**
   * Get a specific role by id
   *
   * @param {number} id - The resource unique identifier
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof RoleService
   */
  async getById(id, options) {
    const row = await super.getById(id, {
      include: [
        {
          model: Role,
          as: 'parentRole',
          attributes: { exclude: ['parent'] },
        },
      ],
      attributes: { exclude: ['parent'] },
      ...options,
    });

    return row;
  }

  static includePermissions() {
    return [{
      model: Permission,
      as: 'permissions',
      attributes: { exclude: ['id'] },
      through: { attributes: [] },
    }];
  }

  static serializeData(data) {
    const serializedData = data.map((item) => {
      const { permissions, parentRole } = item;
      let permissionList;

      if (permissions.length > 0) {
        permissionList = permissions.map(permit => permit.scope);
        item.permissions = permissionList;
      }

      if (parentRole) {
        permissionList = parentRole.permissions.map(permit => permit.scope);
        item.parentRole.permissions = permissionList;
      }

      return item;
    });

    return serializedData;
  }
}

export default new RoleService(Role);
