export const up = (queryInterface, Sequelize) => (
  queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    body: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'id',
        as: 'author',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  })
);

export const down = queryInterface => queryInterface.dropTable('Articles');
