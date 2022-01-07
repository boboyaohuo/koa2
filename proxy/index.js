const Index = require('../models/index.js');
const { Op } = require('sequelize');
const http = require('http');
const axios = require('axios');

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
  return await Index.create(value);
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
exports.getTinify = (options, fileName) => {
  return axios.post(
    options.url,
    {
      source: {
        url: `https://www.wujianbo.com/upload/${fileName}`
      }
    },
    {
      headers: options.headers
    }
  );
};
