const createError = require('http-errors');
const { Op } = require('sequelize');
// ==============================================
const { category, product, shop, item, sequelize } = require('../db/models');

const getTime = (ago) => {
	const timeAgo = new Date();
	switch (ago) {
		case 'day': {
			timeAgo.setDate(timeAgo.getDate() - 1);
			break;
		}
		case 'week': {
			timeAgo.setDate(timeAgo.getDate() - 7);
			break;
		}
		case 'month': {
			timeAgo.setMonth(timeAgo.getMonth() - 1);
			break;
		}
		case 'year': {
			timeAgo.setFullYear(timeAgo.getFullYear() - 1);
			break;
		}
	}
	return timeAgo;
};
class StatControllers {
	async getCostsByCategoryPerWeek(req, res, next) {
		const weekAgo = new Date();
		weekAgo.setDate(weekAgo.getDate() - 10);
		try {
			const { cat } = req.query;
			const [categoryId] = await category.findAll({
				attributes: ['id'],
				where: {
					title: cat,
				},
				raw: true,
			});
			const { id: catId } = categoryId;
			console.log('Result is', catId);
			const productIds = await product.findAll({
				where: {
					category_id: catId,
				},
				attributes: ['id'],
				raw: true,
			});
			const prodIds = productIds.map((item) => item.id);
			// console.log(prodIds)
			const costByCatPerWeek = await item.findAll({
				attributes: [
					// 'summ',
					[sequelize.fn('SUM', sequelize.col('summ')), 'result'],
				],
				where: {
					product_id: {
						[Op.in]: prodIds,
					},
					createdAt: {
						[Op.gte]: weekAgo,
					},
				},
				group: ['currency_id'],
				raw: true,
			});
			console.log(costByCatPerWeek);
			if (costByCatPerWeek) {
				console.log(
					`Result is: ${JSON.stringify(costByCatPerWeek, null, 2)}`
				);
				res.status(200).json(costByCatPerWeek);
			} else {
				next(createError(404, 'Bad request'));
			}
		} catch (error) {
			next(error);
		}
	}

	async getCostByCat(req, res, next) {
		try {
			const { ago } = req.query;
			const time = getTime(ago);
			const costByCat = await item.findAll({
				attributes: [
					'product->category.title',
					[sequelize.fn('SUM', sequelize.col('summ')), 'result'],
				],
				include: [
					{
						model: product,
						attributes: [],
						include: [
							{
								model: category,
								attributes: [],
							},
						],
					},
				],
				where: {
					createdAt: {
						[Op.gte]: time,
					},
				},
				group: ['product->category.id'],
				raw: true,
			});
			console.log(costByCat);
			if (costByCat) {
				res.status(200).json(costByCat);
			} else {
				next(createError(404, 'Bad request'));
			}
		} catch (error) {
			console.log('Errrrror', error.message);
			next(error);
		}
	}

	async getCostByShop(req, res, next) {
		try {
			const {ago} = req.query;
			const time = getTime(ago);
			const costByShop = await item.findAll({
				attributes: [
					'shop.title',
					'shop.url',
					[sequelize.fn('SUM', sequelize.col('summ')), 'result'],
				],
				include: [
					{
						model: shop,
						attributes: [],
					},
				],
				where: {
					createdAt: {
						[Op.gte]: time,
					},
				},
				group: ['shop.title', 'shop.url'],
				raw: true,
			});
			console.log(costByShop);
			if (costByShop) {
				res.status(200).json(costByShop);
			} else {
				next(createError(404, 'Bad request'));
			}
		} catch (error) {
			console.log('Shop error is:', error.message);
			next(error);
		}
	}
}

module.exports = new StatControllers();
