import models from '@database/models';

module.exports = async () => {
  await models.sequelize.sync({ force: true });
};
