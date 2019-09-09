import models from '@database/models';

module.exports = () => {
  // keep connection pool alive when running on watch mode
  if (process.argv.indexOf('--watch') === -1) {
    models.sequelize.close();
  }
};
