'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      category.hasMany(models.product, {
        foreignKey: 'category_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};