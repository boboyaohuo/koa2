const Index = require('../models/index.js');
const { Op } = require('sequelize');
const http = require('http');
const axios = require('axios');

/**
 * 根据Id 反查询列表
 * @param {Number} 文本编号
 * @returns {string} 文本
 */
exports.getIndex = async (id) => {
  return await Index.findAll({
    where: {
      id: {
        [Op.ne]: id
      },
      status: {
        [Op.eq]: 1
      }
    }
  });
};

/**
 * 根据Id 反查询列表
 * @returns {Array} 文本数组
 */
exports.getIndexList = async () => {
  return await Index.findAll({
    where: {
      status: {
        [Op.eq]: 1
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
  return await Index.create(value);
};

/**
 * 更新文本
 * @param {String} id
 * @param {String} text
 * @param {String} status
 * @returns {}
 */
exports.updateIndex = async ({ id, text, status }) => {
  return await Index.update({ text, status }, { where: { id } });
};

/**
 * 删除文本
 * @param {Number} Id
 * @returns {}
 */
exports.deleteIndex = async (id) => {
  return await Index.destroy({
    where: {
      id
    }
  });
};

/**
 * 查询349
 */
exports.getLatestOrder = (options) => {
  return new Promise(async (resolve, reject) => {
    const req = await http.request(options, function (res) {
      res.on('data', function (chunk) {
        resolve(JSON.parse(chunk.toString()));
      });
    });
    req.on('error', function (e) {
      console.log('-----error-------', e);
      reject(e);
    });
    req.end();
  });
};

/**
 * tinify 压缩
 */
exports.getTinify = (options, url) => {
  return axios.post(
    options.url,
    {
      source: {
        url
      }
    },
    {
      headers: options.headers,
      timeout: 120000
    }
  );
};
