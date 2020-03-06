const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const env = require('../lib/env');

const DEFAULT_RFS_CONFIG = {
	filename: 'access.log',
	options: {
		interval: '1d', // 按天滚动
		maxFiles: 7, // 保存一周的日志
		path: path.join(process.cwd(), './logs'),
	},
};

// 自定义 token
morgan.token('localDate',function getDate() {
  let date = new Date();
  return date.toLocaleString();
});

const LOG_FORMAT_DEV = ':method :url :status :response-time ms :res[content-length] :res[content-type]';
const LOG_FORMAT_PRODUCTION = ':remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] :res[content-type] ":referrer" ":user-agent"';

module.exports = function({ logFormat, logOptions = {}, rfsConfig = {} } = {}) {
  // 设置日志格式
  if (!logFormat) {
    logFormat = env.isDev 
      ? LOG_FORMAT_DEV
      : LOG_FORMAT_PRODUCTION;
  }

	// 滚动日志实例
  let accessLogStream = null;
  
	if (rfsConfig) {
		rfsConfig = {
			...rfsConfig,
			...DEFAULT_RFS_CONFIG,
    };

		accessLogStream = rfs.createStream(rfsConfig.filename, rfsConfig.options);
	}

	return async function(ctx, next) {
		await next();

		const logger = env.isDev
			? morgan(logFormat, logOptions)
			: morgan(logFormat, { ...logOptions, stream: accessLogStream });
		const loggerPrms = new Promise((resolve, reject) => {
			logger(ctx.req, ctx.res, function(err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		await loggerPrms;
	};
};
