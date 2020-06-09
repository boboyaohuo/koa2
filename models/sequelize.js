const Sequelize = require('sequelize');
const config = require('../config/config');

// 链接数据库
const sequelize = new Sequelize(config.database.DATABASENAME, config.database.USERNAME, config.database.PASSWORD, {
	host: config.database.HOST,
	port: config.database.PORT,
	dialect: config.database.DIALECT,
	underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
	timezone: config.database.timezone, // 东八区
	define: {
		freezeTableName: true
	}
});

module.exports = sequelize;
