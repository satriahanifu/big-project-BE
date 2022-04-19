"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      userid: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      paymentid: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Payments",
          },
          key: "id",
        },
      },
      shipmentid: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Shipments",
          },
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("paid", "unpaid"),
      },
      buktiBayar: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
