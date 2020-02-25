class BaseResponse {
	constructor({ data = null, code = 0, msg = '', status = 200 } = {}) {
		this.data = data;
		this.code = code;
		this.msg = msg;
		this.status = status;
	}

	get json() {
		return {
			data: this.data,
			code: this.code,
			msg: this.msg,
		};
	}
}

module.exports = BaseResponse;
