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
  APP_SERVER_ERROR: 'App Server Error, please contact the admin',
  NOT_FOUND: `Not Found. Use /api/${API_VERSION} to access the api resource`,

  RESOURCE_FOUND: 'Resource(s) found',
  RESOURCE_NOT_FOUND: 'No resource(s) found',

  WELCOME_MESSAGE: 'Welcome to AuthorsPad',

  NO_AUTH_TOKEN: 'Access denied. No token provided.',
  INVALID_AUTH_TOKEN: 'Authentication failure: Invalid or expired token.',
  INVALID_TOKEN_FORMAT: 'Authorization token must be in the format: Bearer <token>.',
  INVALID_CREDENTIALS: 'Your username or password is incorrect.',
};
