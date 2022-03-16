// import important parts of sequelize library
const { is } = require('bluebird');
const { isNumber } = require('lodash');
const { Model, DataTypes, DECIMAL } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    //id column defined as an integer, with no null value, a primary key, and auto incrementation.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //product_name column defined as a string with no null value.
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //price column defined as a decimal type with no null value, and validation to verify the value is a decimal.
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate : {
        isDecimal: true,
      }
    },
    //stock column defined as an integer data type, with no null value, a default value of 10, and validation that the value is numeric.
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      }
    },
    //category_id column defined as an integer and references the category table's id column.
    category_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
