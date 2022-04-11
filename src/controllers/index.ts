// 自动引入
const controllers = require('require-all')({
  dirname: __dirname,
  filter: /(.+\.controller)\.[jt]s$/,
  recursive: true,
});
module.exports = controllers;

// 手动引入
// export * from './common/common.controller';
// export * from './home/city.controller';
// export * from './home/group.controller';
// export * from './index.controller';
