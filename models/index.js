const sequelize = require('./sequelize.js');
const Sequelize = require('sequelize');

const Index = sequelize.define('t_index', {
  text: {
    type: Sequelize.STRING(500),
    allowNull: false,
    comment: '文本'
  }
});

// Index.sync({ alter: true }); // 自动同步创建表 （不安全）
Index.sync(); // 没有表就创建表，有表无操作

module.exports = Index;
