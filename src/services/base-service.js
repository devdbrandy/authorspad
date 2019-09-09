export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Get a list of resources
   *
   * @param {object} options - Query options
   * @returns {Array} List of users
   * @memberof BaseService
   */
  async getAll(options = {}) {
    const rows = await this.model.findAll();

    const { plain } = options;
    return (plain === true) ? rows.map(row => row.get({ plain })) : rows;
  }

  /**
   * Get a specific resource by id
   *
   * @param {number} id - The resource unique identifier
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof BaseService
   */
  async getById(id, options = {}) {
    const row = await this.model.findByPk(id);

    const { plain } = options;
    return (row && plain === true) ? row.get() : row;
  }

  /**
   * Search for a specific resource using the WHERE clause
   *
   * @param {object} where - Where clause
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof BaseService
   */
  async find(where, options = {}) {
    const row = await this.model.findOne({ where });

    const { plain } = options;
    return (row && plain === true) ? row.get() : row;
  }

  /**
   * Create a new resource
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof BaseService
   */
  async create(data, options = {}) {
    const row = await this.model.create(data);
    return options.plain === true ? row.toJSON() : row;
  }

  /**
   * Update a specific resource
   *
   * @param {number} id - The resource unique identifier
   * @param {object} data - The resource new data
   * @returns {number} The number of affected row(s)
   * @memberof BaseService
   */
  async update(id, data) {
    const [, row] = await this.model.update(data, {
      where: { id },
      returning: true,
      plain: true,
    });
    const plainData = row.get({ plain: true });
    delete plainData.deletedAt;
    return plainData;
  }

  /**
   * Delete a specific resource
   *
   * @param {number} id - The resource unique identifier
   * @returns {object} The updated resource
   * @memberof BaseService
   */
  async delete(id) {
    return this.model.destroy({ where: { id } });
  }
}
