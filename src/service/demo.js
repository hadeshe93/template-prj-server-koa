// const Sequelize = require('sequelize');
const { Demo } = require('../model');

module.exports = {
	create(data) {
		return Demo.create(data);
	},

	getList(conditions = {}) {
		return Demo.findAll(conditions);
	},

	update(data, conditions) {
		return Demo.update(data, conditions);
	},

	delete(conditions = {}) {
		return Demo.destroy(conditions);
	},
};
