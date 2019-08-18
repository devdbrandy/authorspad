import models from '@database/models';

module.exports = () => {
  models.sequelize.close();
};
