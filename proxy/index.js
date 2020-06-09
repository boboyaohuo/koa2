const Index = require('../models/index.js');
const { Op } = require("sequelize");

/**
 * 根据Id 反查询列表
 * @param {Number} 文本编号
 * @returns {Array} 文本数组
 */
exports.getIndex = async (id) => {
	return await Index.findAll({
		where: {
			id: {
        [Op.ne]: id
      }
		}
	});
};

/**
 * 插入新文本
 * @param {String} 文本
 * @returns {}
 */
exports.addIndex = async (value) => {
  return await Index.create(value)
}
