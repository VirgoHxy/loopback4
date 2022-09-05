# question list

- 脱离了 loopback 的命令，开发就会变得复杂，所以需要遵守 loopback 的规则，不能做灵活的改动
- model 的 schema 如何使用自定义的 relation
- @belongsTo 怎么和 @property 一起使用
- 当 model 作为参数时出现校验问题，只能重新定义参数 model

# to-do list

# done list

- controllers， models， repositories， services 文件夹不分层，就会把所有文件都放在一个文件夹，不易维护
  - 可以通过在命名文件增加模块名进行区分
- tsconfig.json 的别名提示需要重新关闭项目才会有提示，import json 文件的属性不会有提示
  - 使用 index.js 引入再抛出 json 值
- 设置别名

  - 引入 module-alias
  - 在 package.json 中添加\_moduleAliases
  - 在入口文件`import 'module-alias/register'`

- 命名规范修改
- 部分文件夹添加 index.ts

  - 通过引入 index.ts 来引入模块
  - 可以减少引用需要的路径
  - 比如: city.repository.ts 文件中的`import {City， CityWithRelations} from '$models/home/city.model';import {Group} from '$models/home/group.model';`就可以合并为`import {City， CityWithRelations， Group} from '$models';`
  - 因为最后 import 会转为 require，不知道是否对打包后体积有影响 -- ❓

- 每次启动都需要重新编译，代码如何热更新

  - 使用 nodemoon -- 不能做到只更新修改的代码，只能重新执行 npm start 命令，依然会重新启动服务，浪费很多的打包时间
  - 使用 tsc-watch 能够完成热更新，而不是重新启动服务器

- 增加日志监控，做统一处理
  - 使用 winston 替换 log4js
- 错误类型，返回结果统一定义
- 使用中间件校验 token 和返回结果
- 文件夹说明文档
