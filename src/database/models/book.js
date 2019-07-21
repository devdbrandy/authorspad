import { Op } from 'sequelize';

export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
  }, {
    paranoid: true,
    defaultScope: {
      where: {
        authorId: { [Op.ne]: null },
      },
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      foreignKey: 'authorId',
      as: 'author',
    });
  };

  return Book;
};
