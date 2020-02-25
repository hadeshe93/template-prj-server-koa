const db = require('./db');

module.exports = {
	server: {
		port: 3000,
	},
	db: {
		mysql: db.mysql,
	},
};
