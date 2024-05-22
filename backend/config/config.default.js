'use strict';

exports.rpc = {
  // registry: {
  //   address: '127.0.0.1:2181',
  // },
  // client: {},
  // server: {},
};


exports.mongo = {
  client: {
    host: '127.0.0.1',
    port: '27017',
    name: 'test', // 数据库名
  },
};
exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1:27017/test',
    options: {},
    // 其他配置
  },
};
exports.jwt={
  secret: '123456',
  expiresIn: '24h',
}

exports.security = {
  csrf: {
    enable: false,
  },
};

exports.cors = {
  origin: 'http://localhost:3000',  // 允许所有源访问，或者指定具体来源如 'https://example.com'
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  // 其他可配置项: allowHeaders, credentials 等
};