// config.js
const config = {
	// 启动端口
	port: 3000,
	// 数据库配置
	database: {
		DATABASENAME: 'boboyaohuo', // 数据库名称
		USERNAME: 'root', // mysql用户名
		PASSWORD: 'WUji1123581321', // mysql密码
		HOST: '150.109.118.154', // 线上服务器ip
		// HOST: '192.168.148.131', // 测试服务器ip
		PORT: '3306', // mysql端口号
		DIALECT: 'mysql', // 数据库类型
		timezone: '+08:00' // 时区 东八区
	}
};

module.exports = config;
