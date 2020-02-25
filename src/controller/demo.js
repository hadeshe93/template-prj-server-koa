const { Demo } = require('../service');
const { apiResponse } = require('../lib/api');

module.exports = {
	async create(ctx) {
		const { content } = ctx.request.body;
		const res = await Demo.create({ content });

		apiResponse(ctx, res);
	},

	async getList(ctx) {
		const res = await Demo.getList();

		apiResponse(ctx, res);
	},

	async update(ctx) {
		const { id, content } = ctx.request.body;
		const res = await Demo.update({ content }, { where: { id } });

		apiResponse(ctx, res);
	},

	async delete(ctx) {
		const { id } = ctx.request.body;
		const res = await Demo.delete({ where: { id } });

		apiResponse(ctx, res);
	},
};
