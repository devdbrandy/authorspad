import faker from 'faker';
import models from '@database/models';


/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * @typedef {Object} User
 * @property {string} firstName - The user firstname
 * @property {string} lastName - The user lastname
 * @property {string} email - The user email address
 * @property {string} username - The user unique username
 * @property {string} password - The user passwor
 */


/**
 * Generates a user object with default attributes
 *
 * @param {User} [props={}] - The user properties
 */
export const userFactory = (props = {}) => {
  const defaultProps = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: '$2a$10$QRUIZwSPLLkS4BVJQZ75wu6LROYIqe5eKMsWYV2C21bCnUNS51NAK', // secret
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Instantiate user class with default attributes
 * @param {User} [props={}] - The user properties
 * @returns {Model} A User model
 */
export const build = props => new models.User(userFactory(props));

/**
 * Generates a user model instance with default attributes
 * @param {User} [props={}] - The user properties
 * @returns {Model|User}
 */
export default async (props) => {
  const result = await models.User.create(userFactory(props));

  const user = result.get({ plain: true });
  delete user.deletedAt;
  return user;
};
