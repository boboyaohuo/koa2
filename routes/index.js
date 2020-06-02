const router = require('koa-router')();
const service = require('../lib/mysqlConfig');

router.get('/getIndex', async (ctx, next) => {
	let res = await service.getIndex();
	ctx.body = {
		data: res,
		status: 0,
		message: 'ok'
	};
});

module.exports = router;
