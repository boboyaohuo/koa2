const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const json = require('koa-json');
const onerror = require('koa-onerror');
const body = require('koa-body');
const logger = require('koa-logger');
const cron = require('node-cron');
const controller = require('./controller/index');

const index = require('./routes/index');

// error handler
onerror(app);

cron.schedule('* 7 * * *', () => {
  controller.aLoveLetter();
});

// middlewares
app.use(
  body({
    multipart: true, // 支持文件上传
    json: true // 解析json请求体
  })
);
app.use(json());
app.use(logger());
app.use(
  cors({
    origin: function (ctx) {
      return ctx.header.origin;
    },
    credentials: true //是否允许发送Cookie
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
