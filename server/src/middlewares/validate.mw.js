// const createError = require('http-errors');

const {
	PRODUCT_SCHEMA,
	CAT_CURR_MEAS_SCHEMA,
	SHOP_SCHEMA,
	ITEM_SCHEMA,
} = require('../utils/validSchemas');

module.exports.validateProducts = async (req, res, next) => {
	const { body } = req;
	try {
		await PRODUCT_SCHEMA.validate(body, { abortEarly: false });
		next();
	} catch (error) {
    console.log(`Product is no valid`)
		next(error);
	}
};

module.exports.validateCatCurrMeasure = async (req, res, next) => {
	const { body } = req;
	try {
		await CAT_CURR_MEAS_SCHEMA.validate(body, { abortEarly: false });
		next();
	} catch (error) {
    console.log(`Category, currency or measure is no valid`)
		next(error);
	}
};

module.exports.validateShop = async (req, res, next) => {
	const { body } = req;
	try {
		await SHOP_SCHEMA.validate(body, { abortEarly: false });
		next();
	} catch (error) {
    console.log(`Shop is no valid`)
		next(error);
	}
};

module.exports.validateItem = async (req, res, next) => {
	const { body } = req;
	try {
		await ITEM_SCHEMA.validate(body, { abortEarly: false });
		next();
	} catch (error) {
    console.log(`Item is no valid`)
		next(error);
	}
};


