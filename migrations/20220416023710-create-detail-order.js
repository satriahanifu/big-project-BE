"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailOrders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Orders",
          },
          key: "id",
        },
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Products",
          },
          key: "id",
        },
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("DetailOrders");
  },
};
