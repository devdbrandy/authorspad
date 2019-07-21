import homeRouter from './home';
import usersRouter from './users';
import booksRouter from './books';

/**
 * A wrapper for preloading the routes
 *
 * @param {object} app - The express main app
 * @returns {void}
 */
const routes = (app) => {
  app.use(homeRouter);
  app.use(usersRouter);
  app.use(booksRouter);

  return app;
};

export default routes;
