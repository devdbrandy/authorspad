import models from '@database/models';
import BaseService from './base-service';

const { Sequelize: { Op } } = models;

class UserService extends BaseService {
  /**
   * Create a new user resource
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof BaseService
   */
  async create(data, options = {}) {
    const row = await super.create(data, options);
    delete row.password;
    delete row.deletedAt;
    return row;
  }

  /**
   * Get a specific user by username or email
   *
   * @param {number} id - The resource unique identifier
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof BaseService
   */
  async getByEmailOrUsername(field, options = {}) {
    const row = await this.model.findOne({
      where: {
        [Op.or]: [{ email: field }, { username: field }],
      },
    });

    const { plain } = options;
    return plain === true ? row.get({ plain }) : row;
  }
}

const { User } = models;
export default new UserService(User);
