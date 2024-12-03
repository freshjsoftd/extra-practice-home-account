'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category_id: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};