const router = require('koa-router')();
const controller = require('../controller/index');

router.get('/getIndex', controller.getIndex);

router.get('/getIndexList', controller.getIndexList);

router.post('/addIndex', controller.addIndex);

router.post('/updateIndex', controller.updateIndex);

router.get('/deleteIndex', controller.deleteIndex);

router.post('/getLatestOrder', controller.getLatestOrder);

router.post('/postTinify', controller.postTinify);

module.exports = router;
