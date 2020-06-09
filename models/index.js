const sequelize = require('./sequelize.js');
const Sequelize = require('sequelize');

const Index = sequelize.define('t_index', {
	text: {
		type: Sequelize.STRING(500),
		allowNull: false,
		comment: '文本'
	}
});

Index.sync(); // 创建表

module.exports = Index;
