const Index = require('../proxy/index');
const fs = require('fs');
const path = require('path');

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
  var opt = {
    host: '47.243.140.214',
    port: 80,
    method: 'POST',
    path: ctx.request.url,
    headers: ctx.request.headers
  };
  const res = await Index.getLatestOrder(opt);
  if (res.state == 'ok') {
    ctx.body = {
      data: res,
      status: 0,
      message: 'ok'
    };
  } else {
    ctx.body = {
      data: res,
      status: -1,
      message: res.state
    };
  }
};

/**
 * tinify 压缩
 */
exports.postTinify = async (ctx) => {
  const options = {
    url: 'https://api.tinify.com/shrink',
    headers: {
      Authorization: 'Basic YXBpOm1wUHhsRUlqWXBjWEJjNGNuR2NyZWJib1hJeFpWTlRM'
    }
  };
  // const file = ctx.request.files.files;
  // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // let filePath = path.join(__dirname, '../../html/upload') + `/${file.name}`;
  // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  // reader.pipe(upStream);

  const { url } = ctx.request.body;
  const res = await Index.getTinify(options, url);
  if (res.data.output) {
    ctx.body = {
      data: res.data,
      status: 0,
      message: 'ok'
    };
  } else {
    ctx.body = {
      data: res.data,
      status: -1,
      message: res.data.message
    };
  }
};
