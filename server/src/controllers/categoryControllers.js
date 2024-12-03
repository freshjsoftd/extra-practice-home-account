const createError = require('http-errors');
// ==============================================
const { category, sequelize } = require('../db/models');

class CategoryControllers {
	async getAllCategories(req, res, next) {
		try {
			const allCategories = await category.findAll({
				attributes: ['id', 'title'],
				raw: true,
			});
			// console.log('All categories are ', allCategories)
			if (allCategories) {
				console.log(
					`Result is: ${JSON.stringify(allCategories, null, 2)}`
				);
				res.status(200).json(allCategories);
			} else {
				next(createError(404, 'Any category has not been found'));
			}
		} catch (error) {
			next(error);
		}
	}

	async createCategory(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const body = req.body;
			const newCategory = await category.create(body, {
				transaction: t,
				returning: ['id'],
			});
			if (newCategory) {
				console.log(
					`Result is: ${JSON.stringify(newCategory, null, 2)}`
				);
				res.status(200).json(newCategory);
			} else {
				console.log('Bad request');
				next(createError(400, 'Bad request'));
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
	async updateCategory(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const { body } = req;
			const updatedCategory = await category.update(body, {
				where: {
					id: body.id,
				},
				transaction: t,
				raw: true,
				returning: ['id', 'title'],
			});
			console.log(updatedCategory[0]);
			if (updatedCategory[0] > 0) {
				console.log(
					`Result is: ${JSON.stringify(updatedCategory[1], null, 2)}`
				);
				res.status(200).json(updatedCategory[1]);
			} else {
				console.log('This category hasn`t been found');
				next(createError(400, 'This category hasn`t been found'));
			}
			await t.commit();
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}
	async deleteCategory(req, res, next){
    const t = await sequelize.transaction();
    try {
      const id = req.params.id;
      const delCategory = await category.destroy({
        where: {
					id: id,
				},
				transaction: t,
      })
      if (delCategory) {
				res.send(res.statusCode);
			} else {
				next(createError(404, 'This category has not been found'));
			}
			await t.commit();
    } catch (error) {
      await t.rollback();
			next(error);
    }
  };

	
	async changePartCategory(req, res, next) {}
}

module.exports = new CategoryControllers();
