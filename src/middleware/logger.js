const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

const defaultRfsConfig = {
	filename: 'access.log',
	options: {
		interval: '1d', // 按天滚动
		maxFiles: 7, // 保存一周的日志
		path: path.join(process.cwd(), './logs'),
	},
};

module.exports = function({ logFormat = 'combined', rfsConfig = {} } = {}) {
	// 滚动日志实例
	let accessLogStream = null;

	if (rfsConfig) {
		rfsConfig = {
			...rfsConfig,
			...defaultRfsConfig,
		};

		accessLogStream = rfs.createStream(rfsConfig.filename, rfsConfig.options);
	}

	return async function(ctx, next) {
		await next();

		const logger = accessLogStream
			? morgan(logFormat)
			: morgan(logFormat, { stream: accessLogStream });
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
