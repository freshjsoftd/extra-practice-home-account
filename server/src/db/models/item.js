'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.belongsTo(models.product, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      item.belongsTo(models.shop, {
        foreignKey: 'shop_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      item.belongsTo(models.measure, {
        foreignKey: 'measure_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      item.belongsTo(models.currency, {
        foreignKey: 'currency_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  item.init({
    product_id: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    price: DataTypes.DECIMAL(10, 2),
    summ: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    shop_id: DataTypes.INTEGER,
    measure_id: DataTypes.INTEGER,
    currency_id: DataTypes.INTEGER
  }, 
  {
    sequelize,
    modelName: 'item',
  });
  return item;
};