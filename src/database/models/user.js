import UserHooks from '../hooks/user-hooks';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        name: 'users_email',
        msg: 'A user with this email already exists.',
      },
    },
  }, {
    paranoid: true,
    hooks: UserHooks,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Book, {
      foreignKey: 'authorId',
      as: 'books',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return User;
};
