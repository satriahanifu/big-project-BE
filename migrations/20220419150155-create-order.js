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
      userId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      paymentId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Payments",
          },
          key: "id",
        },
      },
      shipmentId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Shipments",
          },
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("lunas", "belum lunas"),
        default: "belum lunas",
      },
      buktiBayar: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
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
