'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    title: DataTypes.STRING,
    address: DataTypes.TEXT,
    primary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};