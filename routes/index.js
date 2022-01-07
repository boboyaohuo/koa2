const router = require('koa-router')();
const controller = require('../controller/index');

router.get('/getIndex', controller.getIndex);

router.post('/addIndex', controller.addIndex);

router.post('/getLatestOrder', controller.getLatestOrder);

router.post('/postTinify', controller.postTinify);

module.exports = router;
