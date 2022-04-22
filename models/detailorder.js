"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailOrder.init(
    {
      orderId: DataTypes.STRING,
      productId: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailOrder",
    }
  );
  return DetailOrder;
};
