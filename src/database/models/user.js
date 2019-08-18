import UserHooks from '../hooks/user-hooks';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
        exclude: ['deletedAt'],
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'authorId',
      as: 'articles',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return User;
};
