'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class measure extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			measure.hasMany(models.item, {
				foreignKey: 'measure_id',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			});
		}
	}
	measure.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			description: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: 'measure',
		}
	);
	return measure;
};
