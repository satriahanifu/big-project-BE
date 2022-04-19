"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Products.belongsTo(models.Categories, {
        as: "category",
        foreignKey: "categoryid",
      });
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
      size: DataTypes.ENUM("small", "medium", "large", "extra large"),
      image: DataTypes.STRING,
      categoryid: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
