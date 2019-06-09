const homeRouter = require('./home');
const usersRouter = require('./users');

/**
 * A wrapper for preloading the routes
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = (app) => {
  app.use(homeRouter);
  app.use(usersRouter);

  return app;
};

module.exports = routes;
