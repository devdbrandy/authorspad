import faker from 'faker';
import models from '@database/models';

/**
 * Generates a user object with default attributes
 *
 * @param {object} [props={}] - The user properties
 * @returns {object} A user object
 */
export const userFactory = (props = {}) => {
  const defaultProps = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
  };
  return Object.assign({}, defaultProps, props);
};

export default async props => models.User.create(userFactory(props));
