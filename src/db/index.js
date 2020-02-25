const Sequelize = require('sequelize');

const dbConfig = require('../config').db;

const seqOPtions = {
	...dbConfig.mysql,
	// 东八区 北京时间
	timezone: '+08:00',
	dialect: 'mysql',
};
const sequelize = new Sequelize(seqOPtions);

module.exports = {
	sequelize,
};
