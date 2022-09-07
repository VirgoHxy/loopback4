# question list

- 查询数据操作和插入/更新/删除数据操作在一起时，查询数据需不需要加事务
  - 查询数据用于更新/插入其他数据
  - 查询数据用于更新该数据
  - 查询数据但不用于数据库操作，只返回数据
  - 循环查询同一个数据

# to-do list

# done list

- 脱离了 loopback 的命令，开发就会变得复杂，所以需要严格遵守 loopback 的规则，尽量使用命令来创建代码，不要做灵活的自定义
- controllers， models， repositories， services 文件夹不分层，就会把所有文件都放在一个文件夹，不易维护
  - 不能使用子文件夹，loopback 不识别
  - 可以通过在命名文件增加模块名进行区分
- tsconfig.json 的别名提示需要重新关闭项目才会有提示，import json 文件的属性不会有提示

  - 使用 index.js 引入再抛出 json 值

- 如何自定义 和请求参数相关 model 的 schema

  1. 不返回无法加到 schema 字段，就只返回基础的模型字段；就是结果和文档不对应
  2. 手写所有的 chema；工作量很大
  3. 定义自定义 model 继承实体 model，这个自定义 model 只用做 schema 和类型定义，不和数据库有关联；大致可以，工作量较大

- @belongsTo 怎么和 @property 一起使用

```typescript
@belongsTo(
  () => YourModel,
  {keyFrom: 'yourField'},
  {
    type: 'number',
    scale: 0,
    postgresql: {
      columnName: 'your_field',
      dataType: 'integer',
      dataLength: null,
      dataPrecision: null,
      dataScale: 0,
      nullable: 'YES',
    },
  },
)
yourField: number
```

- 设置别名

  - 引入 module-alias
  - 在 package.json 中添加\_moduleAliases
  - 在入口文件`import 'module-alias/register'`
  - 在 loopback 设置别名用处不大，不建议设置

- 命名规范修改
- 部分文件夹添加 index.ts

  - 通过引入 index.ts 来引入模块
  - 可以减少引用需要的路径
  - 比如: city.repository.ts 文件中的`import {City， CityWithRelations} from '../models/home/city.model';import {Group} from '../models/home/group.model';`就可以合并为`import {City， CityWithRelations， Group} from '../models';`
  - 因为最后 import 会转为 require，不知道是否对打包后体积有影响 -- ❓

- 每次启动都需要重新编译，代码如何热更新

  - 使用 nodemoon 但不能做到只更新修改的代码，只能重新执行 npm start 命令，依然会重新启动服务，浪费很多的打包时间
  - 使用 tsc-watch 能够完成热更新，而不是重新启动服务器

- 增加日志监控，做统一处理
  - 使用 winston 替换 log4js
- 错误类型，返回结果统一定义
- 使用中间件校验 token 和返回结果
- 文件夹说明文档
