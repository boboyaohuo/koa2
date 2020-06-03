//mysqlConfig.js
const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	port: config.database.PORT
});

const query = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err);
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
					connection.release();
				});
			}
		});
	});
};

const services = {
	getIndex: async () => {
		let data = await query(`SELECT * from t_index;`);
		return data[(Math.random() * data.length) | 0];
	},
	addIndex: async (req) => {
		await query(`INSERT INTO t_index ( text ) VALUES ('${req.text}')`);
		return '';
	}
};

module.exports = services;
