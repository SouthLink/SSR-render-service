/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    cluster: {
      listen: {
        path: '',
        port: 8000,
        hostname: '0.0.0.0',
      },
    },
    cors: {
      // origin: 'http://',
      allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
      credentials: true,
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: [ '*', 'http://localhost:8000' ],
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'db',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'monitordb',
      },
    },
    agent: true,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645888316325_353';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
