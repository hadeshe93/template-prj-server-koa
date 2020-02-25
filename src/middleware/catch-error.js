// 错误统一处理中间件

const { ApiException, apiResponse } = require('../lib/api');

module.exports = function() {
	return async function(ctx, next) {
		try {
			await next();
		} catch (err) {
			if (err instanceof ApiException) {
				apiResponse(ctx, err.data, err.msg, err.code, err.status);
			} else {
				ctx.status = 500;
				ctx.body = err.message || 'Interal Server Error';
			}
		}
	};
};
