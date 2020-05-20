const router = require('koa-router')();
const service = require('../lib/mysqlConfig');

router.get('/', async (ctx, next) => {
	let res = await service.getIndexLove();
	ctx.body = {
		data: res,
		code: 0,
		message: ''
	};
});

module.exports = router;
