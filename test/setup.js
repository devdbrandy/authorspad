import models from '@database/models';

module.exports = async () => Promise.all([
  models.sequelize.drop(),
  models.sequelize.sync({ force: true }),
]);
