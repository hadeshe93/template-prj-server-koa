const { Demo } = require('../service');
const { apiResponse } = require('../lib/api');
const nodeExcel = require('excel-export');

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

	async export() {
		const res = await Demo.getList();
		const conf = {
			cols: [
				{ content: '内容', type: 'string' },
				{ createdAt: '创建时间', type: 'string' },
				{ updatedAt: '修改时间', type: 'string' },
			],
			rows: [],
		};

		conf.rows = res.map(row => {
			return [row.content, row.createdAt, row.updatedAt];
		});

    const excel = nodeExcel.execute(conf);
    ctx.type = 'application/vnd.openxmlformats';
    ctx.attachment = 'demo.xlsx';
    // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
		// res.setHeader(
		// 	'Content-Disposition',
		// 	'attachment; filename=' + 'demo.xlsx',
    // );
    
		res.end(excel, 'binary');
	},
};
