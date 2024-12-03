'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shop.hasMany(models.item, {
        foreignKey: 'shop_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  shop.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    url: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'shop',
  });
  return shop;
};