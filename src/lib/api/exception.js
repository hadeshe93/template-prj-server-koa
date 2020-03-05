const BaseResponse = require('./base');

// API 异常基类
class ApiException extends Error {
	constructor(opt, defaultOpt = { msg: '接口异常', code: 1001 }) {
		super();

		let options = defaultOpt;
		if (Object.prototype.toString.call(opt) === '[object Object]') {
			options = {
				...options,
				...opt,
			};
		}

		const rs = new BaseResponse(options);
		try {
			Object.assign(this, rs);
		} catch (e) {
			throw new Error('ApiException 类发生错误');
		}
	}
}

// 参数错误异常
class ParameterException extends ApiException {
	constructor(opt) {
		super(opt, { msg: '请求参数错误', code: 4001 });
	}
}

// 资源未找到异常
class NotFoundException extends ApiException {
	constructor(opt) {
		super(opt, { msg: '请求资源不存在', code: 4002 });
	}
}

// 身份权限失败异常
class AuthFailedException extends ApiException {
	constructor(opt) {
		super(opt, { msg: '身份权限校验失败', code: 4003 });
	}
}

// 没有或无效 token，禁止访问异常
class ForbiddenException extends ApiException {
	constructor(opt) {
		super(opt, { msg: '无效 token，禁止访问', code: 4004 });
	}
}

// token 过期
class TokenExpiredException extends ApiException {
	constructor(opt) {
		super(opt, { msg: 'token 过期，禁止访问', code: 4005 });
	}
}

// 服务器异常
class ServerException extends ApiException {
	constructor(opt) {
		super(opt, { msg: '服务器异常', code: 5001 });
	}
}

module.exports = {
	ApiException,
	ParameterException,
	NotFoundException,
	AuthFailedException,
	ForbiddenException,
	TokenExpiredException,
	ServerException,
};
