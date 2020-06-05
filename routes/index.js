const router = require('koa-router')();
const service = require('../lib/mysqlConfig');

router.get('/getIndex', async (ctx, next) => {
	let res = await service.getIndex(ctx.request.query);
	ctx.body = {
		data: res,
		status: 0,
		message: 'ok'
	};
});

router.post('/addIndex', async (ctx, next) => {
	let res = await service.addIndex(ctx.request.body);
	ctx.body = {
		data: res,
		status: 0,
		message: 'ok'
	};
});

module.exports = router;
