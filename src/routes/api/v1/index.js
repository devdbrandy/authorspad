import homeRouter from './home';
import usersRouter from './users';
import articlesRouter from './articles';

/**
 * Routes register
 *
 * @param {string} apiPrefix - The api version prefix
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = (apiPrefix, app) => {
  app.use(homeRouter);
  app.use(apiPrefix, usersRouter);
  app.use(apiPrefix, articlesRouter);

  return app;
};

export default routes;
