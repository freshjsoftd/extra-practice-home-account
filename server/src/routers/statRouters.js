const { Router } = require('express');
// ==============================================
const statCtrl = require('../controllers/statControllers');

const statRouter = new Router();

statRouter.get('/catperweek', statCtrl.getCostsByCategoryPerWeek);
statRouter.get('/category', statCtrl.getCostByCat);
statRouter.get('/shop', statCtrl.getCostByShop);

module.exports = statRouter;
