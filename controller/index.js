const Index = require('../proxy/index');

/**
 * 首页数据
 */
exports.getIndex = async (ctx) => {
	let { id } = ctx.query;
	if (!!id) {
		let res = await Index.getIndex(id);
		ctx.body = {
			data: res[(Math.random() * res.length) | 0],
			status: 0,
			message: 'ok'
		};
	} else {
		ctx.body = {
			data: '',
			status: 0,
			message: 'ok'
		};
	}
};

/**
 * 首页添加数据
 */
exports.addIndex = async (ctx) => {
	let { text } = ctx.request.body;
	if (!!text) {
		await Index.addIndex({ text });
		ctx.body = {
			data: '',
			status: 0,
			message: 'ok'
		};
	} else {
		ctx.body = {
			data: '',
			status: -1,
			message: '请输入文字后提交'
		};
	}
};
