const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaCompress = require('koa-compress');
const KoaCors = require('koa2-cors');
const { Logger, CatchError } = require('./middleware');

// 时区设置
process.env.TZ = 'Asia/Shanghai';

const config = require('./config');
const router = require('./router');

const app = new Koa();

// 错误中间件
app.use(CatchError());

// 日志中间件
app.use(
	Logger(),
);

// 响应压缩中间件
app.use(
	KoaCompress({
		threshold: 2048,
	}),
);

// 跨域请求中间件
app.use(
	KoaCors({
		origin: '*',
		credentials: true,
		// 缓存预检请求 5s
		maxAge: 5,
		allowMethods: ['GET', 'POST'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
	}),
);

// BODY 解析中间件
app.use(
  KoaBodyParser({
    extendTypes: {
      json: ['text/plain', 'text/json', 'application/json'],
    },
    jsonLimit: '8mb',
    textLimit: '8mb',
    formLimit: '8mb',
  }),
);

// 路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 全局错误兜底逻辑
app.on('error', (err, ctx) => {
	console.error('Error Occurred: ', err);

	if (ctx) {
		ctx.status = 500;
		ctx.body = err.message || 'Interal Server Error';
	}
});

// 监听端口，启动应用
app.listen(config.server.port);

console.log(`Server is running on port ${config.server.port}`);
