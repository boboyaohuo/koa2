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

let t_index = `CREATE TABLE IF NOT EXISTS t_index(
	id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
	text varchar(500) NOT NULL COMMENT '文本',
	PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;`;

const createTable = (sql) => {
	return query(sql, []);
};

// 建表
createTable(t_index);

const services = {
	// 获取首页数据
	getIndex: async (value) => {
		let _sql = `SELECT * FROM t_index WHERE id != ${value};`;
		return query(_sql);
	},
	// 添加首页数据
	addIndex: async (value) => {
		console.log(value)
		let _sql = `INSERT INTO t_index SET text=?;`;
		return query(_sql, value);
	}
};

module.exports = services;
