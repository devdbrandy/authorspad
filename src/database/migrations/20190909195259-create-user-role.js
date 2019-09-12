export const up = (queryInterface, Sequelize) => (
  queryInterface.createTable('UserRoles', {
    userId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    roleId: {
      allowNull: false,
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

export const down = queryInterface => (
  queryInterface.dropTable('UserRoles')
);
