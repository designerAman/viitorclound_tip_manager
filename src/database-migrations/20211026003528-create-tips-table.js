const Sequelize = require("sequelize");

module.exports = {
  up: async (query) => {
    await query.createTable("tips", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tipPercentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  down: async (query) => {
    await query.dropTable("tips");
  },
};
