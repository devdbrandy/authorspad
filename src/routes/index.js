import apiV1 from './api/v1';


/**
 * A wrapper for registering all routes
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = (app) => {
  apiV1('/api/v1', app);
};

export default routes;
