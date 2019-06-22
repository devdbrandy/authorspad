/**
 * A simple wrapper for console
 */
export const logger = console;

/**
 * Gets the value of an environment variable.
 *
 * @param {string} key - Environment variable key
 * @param {string|number|boolean} defaultValue - Value will be used if no environment
 * variable exists for the given key
 * @returns {string|number|boolean} The environment variable value
 */
export const env = (key, defaultValue = null) => {
  const value = process.env[key];
  if (!value) return defaultValue;

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === '(empty)') return '';
  return value;
};

/**
 * Normalize a port into a number, string, or false.
 *
 * @param {number|string|boolean} value - The port value
 * @returns {number|boolean} - Normalized port value or false
 */
export const normalizePort = (value) => {
  const port = parseInt(value, 10);
  if (Number.isNaN(port)) return port;
  return (port >= 0) ? port : false;
};

export default class Utils {
  static normalizePort(value) {
    return normalizePort(value);
  }

  static env(key, defaultValue = null) {
    return env(key, defaultValue);
  }
}
