class Utils {
  /**
   * Normalize a port into a number, string, or false.
   *
   * @param {number|string|boolean} value - The port value
   * @returns {number|boolean} - Normalized port value or false
   */
  static normalizePort(value) {
    const port = parseInt(value, 10);
    if (Number.isNaN(port)) return port;
    return (port >= 0) ? port : false;
  }
}

module.exports = Utils;
