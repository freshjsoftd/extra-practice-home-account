const { Router } = require('express');

const categoryRouter = require('./categoryRouters');
const statRouter = require('./statRouters');
const authRouter = require('./authRouter');

const router = new Router();

router.use('/categories', categoryRouter);
router.use('/stat', statRouter);
router.use('/auth', authRouter);

module.exports = router;
