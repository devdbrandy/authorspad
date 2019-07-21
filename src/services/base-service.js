export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Get a list of resources
   *
   * @returns {Array} List of users
   * @memberof BaseService
   */
  async findAll() {
    return this.model.findAll();
  }

  /**
   * Get a specific resource by id
   *
   * @param {number} id - The resource unique identifier
   * @returns {object} The resource (if found)
   * @memberof BaseService
   */
  async findById(id) {
    return this.model.findByPk(id);
  }

  /**
   * Create a new resource
   *
   * @param {object} data - The resource data
   * @returns {object} The newly created resource
   * @memberof BaseService
   */
  async create(data) {
    return this.model.create(data);
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
    return this.model.update(data, { where: { id } });
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
