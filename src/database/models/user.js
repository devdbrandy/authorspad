import bcrypt from 'bcryptjs';
import shortUUID from 'short-uuid';
import * as userHooks from '../hooks/user-hooks';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => shortUUID.generate(),
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'users_username',
        msg: 'A user with this username already exists.',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'users_email',
        msg: 'A user with this email already exists.',
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    paranoid: true,
    hooks: userHooks,
    defaultScope: {
      attributes: {
        exclude: ['deletedAt'],
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles',
      onDelete: 'cascade',
      hooks: true,
    });

    User.belongsToMany(models.Role, {
      through: 'UserRoles',
      foreignKey: 'userId',
      as: 'roles',
    });
  };

  User.prototype.comparePassword = function compare(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
