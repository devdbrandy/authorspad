export const up = (queryInterface, Sequelize) => (
  queryInterface.createTable('RolePermissions', {
    roleId: {
      type: Sequelize.INTEGER,
    },
    permissionId: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  })
);

export const down = queryInterface => queryInterface.dropTable('RolePermissions');
