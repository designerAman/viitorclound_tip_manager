const Sequelize = require("sequelize");

module.exports = {
  up: async (query) => {
    await query.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  down: async (query) => {
    await query.dropTable("users");
  },
};
