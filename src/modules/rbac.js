/**
 * Role Based Access Control Module
 *
 * @export
 * @class RBAC
 */
export default class RBAC {
  constructor(option) {
    this.init(option);
  }

  init(roles) {
    this.roles = {};

    roles.forEach((role) => {
      const {
        name: roleName,
        parentRole,
      } = role;

      this.roles[roleName] = {
        can: {},
        inherits: [],
      };

      if (role.permissions.length > 0) {
        this.serializePermission(roleName, role);
      }

      if (parentRole) {
        this.roles[roleName].inherits.push(parentRole.name);
      }
    });
  }

  serializePermission(roleName, role) {
    const { permissions } = role;
    const constrained = ['edit', 'delete'];

    permissions.forEach((permission) => {
      if (role.ownership && (constrained.some(param => permission.includes(param)))) {
        this.roles[roleName].can[permission] = RBAC.isOwner;
      } else {
        this.roles[roleName].can[permission] = 1;
      }
    });
  }

  /**
   * Determine if a user is authorized to perform a given action
   *
   * @param {string} role - The user role
   * @param {string} operation - The operation to perform
   * @param {object} params - Additional params required for resources
   * @returns {boolean} truthy if user is authorized or false
   * @memberof RBAC
   */
  can(role, operation, params) {
    // check role existence
    if (!this.roles[role]) return false;

    const $role = this.roles[role];

    if (typeof $role.can[operation] === 'function') {
      return $role.can[operation](params);
    }

    // check if role has access
    if ($role.can[operation]) return true;

    return this.checkParent($role.inherits, operation, params);
  }

  /**
   * Determine if parent roles has the right permission
   *
   * @param {Array} parentRole - A list of roles
   * @param {string} operation - The operation to perform
   * @param {object} params - Additional params required for resources
   * @returns {boolean} truthy if user is authorized or false
   * @memberof RBAC
   */
  checkParent(parentRole, operation, params) {
    // check for parent existence
    if (parentRole.length < 1) return false;

    // Check parent roles until one returns true or all return false
    return parentRole.some(role => this.can(role, operation, params));
  }

  /**
   * Determines if the owner id of a resource matches
   *
   * @static
   * @param {object} param
   * @param {object} param.user - The user object
   * @param {object} param.resource - The resource the compare against
   * @returns {boolean} truthy if user is the owner or false
   * @memberof RBAC
   */
  static isOwner({ user, resource }) {
    return user.id === resource.userId;
  }
}
