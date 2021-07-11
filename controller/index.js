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

/**
 * 349获取信息
 */
exports.getLatestOrder = async (ctx) => {
	ctx.request.headers['X-Requested-With'] = 'XMLHttpRequest';
	ctx.request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	ctx.request.headers.cookie = `td_cookies=${ctx.cookies.get('td_cookis')}&sessionId=${ctx.cookies.get('sessionId')}`
	var opt = {
		host:'47.243.140.214',
		port: 80,
		method:'POST',
		path: ctx.request.url,
		headers:ctx.request.headers
	}
	const res = await Index.getLatestOrder(opt);
	if (res.state == 'ok') {
		ctx.body = {
			data: res,
			status: 0,
			message: 'ok'
		}
	} else {
		ctx.body = {
			data: res,
			status: -1,
			message: res.state
		}
	}
}