export default (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermissions',
      foreignKey: 'permissionId',
      as: 'roles',
    });
  };

  return Permission;
};
