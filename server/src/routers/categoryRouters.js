const { Router } = require('express');
// ==============================================
const categoryCtrl = require('../controllers/categoryControllers');

const { validate: {validateCatCurrMeasure} } = require('../middlewares');

const categoryRouter = new Router();

categoryRouter
	.route('/')
	.get(categoryCtrl.getAllCategories)
	.post(validateCatCurrMeasure, categoryCtrl.createCategory)
	.put(validateCatCurrMeasure,categoryCtrl.updateCategory);

categoryRouter
	.route('/:id')
	.patch(categoryCtrl.changePartCategory)
	.delete(categoryCtrl.deleteCategory);

module.exports = categoryRouter;
