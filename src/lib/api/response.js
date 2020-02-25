const BaseResponse = require('./base');

const apiResponse = function(ctx, data, msg, code, status) {
	let rs = new BaseResponse({
		data,
		msg,
		code,
		status,
	});
	ctx.body = {
		...rs.json,
	};
	ctx.status = rs.status;

	// 释放对象变量
	rs = null;
};

module.exports = apiResponse;
