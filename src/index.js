const Koa = require('koa');
const KoaBody = require('koa-body');
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

// 响应压缩中间件
app.use(
	KoaCompress({
		threshold: 2048,
	}),
);

// 日志中间件
app.use(
	Logger({
		logFormat: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
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

// body 解析中间件
app.use(
	KoaBody({
		// 是否支持 multipart-formdate 的表单
		multipart: true,
		formidable: {
			// 是否支持多文件上传
			multipart: true,
			// 限制字段的最大大小
			maxFieldsSize: 10 * 1024 * 1024,
			// 文件上传文件夹
			// uploadDir: './tempfile/',
			// 保留原来的文件后缀
			keepExtensions: true,
		},
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
