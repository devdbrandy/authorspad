export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    ownership: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: false,
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
      foreignKey: 'roleId',
      as: 'users',
    });
    Role.belongsToMany(models.Permission, {
      through: 'RolePermissions',
      foreignKey: 'roleId',
      as: 'permissions',
    });
    Role.belongsTo(models.Role, {
      foreignKey: 'parent',
      as: 'parentRole',
    });
  };

  return Role;
};
