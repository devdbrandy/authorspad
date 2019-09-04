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

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === '(empty)') return '';
  return value || defaultValue;
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

/**
 * Delete all null (or undefined) properties from an object.
 * Set 'recurse' to true if you also want to delete properties in nested objects.
 *
 * @param {object} data - The data object
 * @param {boolean} recurse - Enable cleanup for nested objects
 * @returns {object} The cleaned object
 */
export const cleanData = (data, recurse) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === null) delete data[key];
    if (recurse && typeof data[key] === 'object') {
      cleanData(data[key], recurse);
    }
  });
  return data;
};

/**
 * Capitalize a given string
 *
 * @param {string} str - The string value
 * @returns {string} The capitalized string
 */
export const capitalize = str => str[0].toUpperCase() + str.slice(1);
