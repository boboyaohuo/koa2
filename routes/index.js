const router = require('koa-router')();
const controller = require('../controller/index');

router.get('/getIndex', controller.getIndex);

router.post('/addIndex', controller.addIndex);

module.exports = router;
