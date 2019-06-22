export const API_VERSION = 'v1';

/**
 * ----------------------------------
 * Response messages and error codes
 * ----------------------------------
 *
 * # 10XX : Main App Errors
 * # 11XX : Http Errors
 * # 12XX : Authentication Erorrs
 * # 13XX : Session Errors
 */

export const messages = {
  APP_SERVER_ERROR: ['App Server Error, please contact the admin', 1000],
  NOT_FOUND: [`Not Found. Use /api/${API_VERSION} to access the api resource`, 1105],

  RESOURCE_FOUND: ['Resource(s) found.'],
  RESOURCE_NOT_FOUND: ['No resource(s) found.', 1106],

  CREATE_SUCCESS: 'Created successfully',
  UPDATE_SUCCESS: 'Updated successfully',
  DELETE_SUCCESS: 'Deleted successfully',
};
