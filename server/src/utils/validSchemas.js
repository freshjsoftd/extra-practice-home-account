const Yup = require('yup');

const TITLE_SCHEMA = Yup.string().trim().min(2).max(100).required();
const ID_SCHEMA = Yup.number().integer().positive();

module.exports.PRODUCT_SCHEMA = Yup.object().shape({
	title: TITLE_SCHEMA,
	category_id: ID_SCHEMA,
});
module.exports.CAT_CURR_MEAS_SCHEMA = Yup.object().shape({
	title: TITLE_SCHEMA,
});
module.exports.SHOP_SCHEMA = Yup.object().shape({
	title: TITLE_SCHEMA,
	url: Yup.string().url().nullable(),
});
module.exports.ITEM_SCHEMA = Yup.object().shape({
	product_id: ID_SCHEMA,
	amount: Yup.number().integer().positive().required(),
	price: Yup.number().positive().nullable(),
	summ: Yup.number().positive().required(),
	shop_id: ID_SCHEMA.nullable(),
	measure_id: ID_SCHEMA.nullable(),
	currency_id: ID_SCHEMA.nullable(),
});

module.exports.EMAIL_VALIDATION_SCHEMA = Yup.string().email();
