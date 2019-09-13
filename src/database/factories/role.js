import faker from 'faker';
import models from '@database/models';


/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * @typedef {Object} Role
 * @property {string} name - The role name
 * @property {string} title - The role title
 * @property {string} description - The role description
 * @property {boolean} ownership - Determine if ownership is checked
 * @property {Permission[]} permissions - Assign role permissions
 */

/**
 * @typedef {Object} Permission
 * @property {string} scope - The permission scope
 */


/**
 * Generates a role object with default attributes
 *
 * @param {Role} [props={}] - The user properties
 */
export const roleFactory = (props = {}) => {
  const defaultProps = {
    name: faker.name.jobType(),
    ownership: false,
    permissions: [],
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user model instance with default attributes
 * @param {User} [props={}] - The user properties
 * @returns {Model|User}
 */
export default async (props) => {
  const {
    name,
    permissions,
    ...defaultProps
  } = roleFactory(props);

  const [role] = await models.Role.findOrCreate({
    where: { name },
    defaults: defaultProps,
  });

  // create & assign permission scopes
  const scopes = await models.Permission.bulkCreate(permissions, { returning: true });
  await role.addPermissions(scopes);

  return role;
};
