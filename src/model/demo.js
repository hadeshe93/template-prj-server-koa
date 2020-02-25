const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Demo = sequelize.define(
	'demo',
	{
		content: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		freezeTableName: true,
	},
);

module.exports = Demo;
