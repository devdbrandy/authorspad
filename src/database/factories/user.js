import faker from 'faker';
import models from '@database/models';

/**
 * Generates a user object with default attributes
 * @param {object} [props={}] - The user properties
 * @param {string} props.firstName - The user firstname
 * @param {string} props.lastName - The user lastname
 * @param {string} props.email - The user email address
 * @returns {{
 *    firstName: string,
 *    lastName: string,
 *    email: string,
 * }} A user object
 */
export const userFactory = (props = {}) => {
  const defaultProps = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  };
  return Object.assign({}, defaultProps, props);
};

/**
* Generates a user object with default attributes
* @param {object} [props={}] - The user properties
* @param {string} props.firstName - The user firstname
* @param {string} props.lastName - The user lastname
* @param {string} props.email - The user email address
* @returns {{
 *    firstName: string,
 *    lastName: string,
 *    email: string,
 * }} A user object
 */
export default async (props) => {
  const result = await models.User.create(userFactory(props));

  const user = result.get({ plain: true });
  delete user.deletedAt;
  return user;
};
