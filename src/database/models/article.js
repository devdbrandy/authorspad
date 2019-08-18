import { Op } from 'sequelize';

export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    paranoid: true,
    defaultScope: {
      where: {
        authorId: { [Op.ne]: null },
      },
      attributes: {
        exclude: ['deletedAt'],
      },
    },
  });

  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
  };

  return Article;
};
