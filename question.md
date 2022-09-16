# question list

# to-do list

# done list

- 脱离了 loopback 的命令，开发就会变得复杂，所以需要严格遵守 loopback 的规则，尽量使用命令来创建代码，不要做灵活的自定义
- controllers， models， repositories， services 文件夹不分层，就会把所有文件都放在一个文件夹，不易维护
  - 不能使用子文件夹，loopback 不识别
  - 可以通过在命名文件增加模块名进行区分
- 如何自定义和请求参数相关 model 的 schema
  1. 不返回无法加到 schema 字段，就只返回基础的模型字段；就是结果和文档不对应
  2. 手写所有的 schema；工作量很大
  3. 定义自定义 model 继承实体 model，这个自定义 model 只用做 schema 和类型定义，不和数据库有关联；大致可以，工作量较大(采取)
- getModelSchemaRef 方法的配置参数
  - includeRelations - schema 是否包含模型关系
  - partial - 是否让模型字段变为可选，一般用于 patch 方法，更新某些字段；当值为`deep`时表示属性为模型也可以可选
  - exclude - 忽略这个数组中的字段
  - optional - 会覆盖 partial，表示这个数组中的字段时可选的
- 手写 schema
  ```javascript
      schema: {
        type: 'object',
        properties: {
          field: {type: 'string'},
        },
      }
  ```
  ```javascript
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: {type: 'string'},
          },
        }
      }
  ```
- 如何格式化 model 的时间
  - 在 model 的 constructor 中使用 `if (this.字段名) this.字段名 = format(this.字段名)`来返回想要的格式内容
  - 可以使用任何想格式化或者转义的字段
- where 语句可以使用正则，当不需要区分大小的字段，可以使用正则
  - `` where: {字段名: {regexp: new RegExp(`^${字段列表.join('$|^')}$`, 'i')} `` - inq 并且不区分大小写精准匹配
  - `` where: {字段名: {regexp: new RegExp(`^${字段}$`, 'i')} `` - 字段不区分大小写精准匹配
  - `` where: {字段名: {regexp: new RegExp(`.*${字段}.*`, 'i')} `` - 模拟 ilike 字段不区分大小写并模糊匹配
- 如何设置 date 类型 model 的校验规则
  - 使用 jsonSchema
  ```javascript
  @property({
    type: 'date',
    jsonSchema: {
      // date date-time time
      format: 'date',
    }
  })
  ```
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

- 参数使用数组

  - get
    `@param.array('fields', 'query', {type: 'string'}) fields?: string[]`
  - post

    ```javascript
      // post
      @property.array(String, {
        type: 'array',
        itemType: 'string',
      })
      fields?: string[];

      // post
      @property.array(FieldClass, {
        type: 'array',
      })
      fields?: FieldClass[];
    ```

- 如何在中间件设置自定义请求头内容，并让 controller 可以正确解析到请求头
  - 没必要，并且在 header 加也不符合规范
  - 可以在 query 里面加自定义参数
- tsconfig.json 的别名提示需要重新关闭项目才会有提示，import json 文件的属性不会有提示
  - 使用 index.js 引入再抛出 json 值
- postgresql 设置自增 id，当导入数据后，表的自增 id 没有变化
  - `ALTER SEQUENCE {schema}.{table}_id_seq RESTART WITH {number}`
- 查询数据操作和插入/更新/删除数据操作在一起时，查询数据需不需要加事务(建议加)
  - 查询数据用于更新/插入其他数据
  - 查询数据用于更新该数据
  - 查询数据但不用于数据库操作，只返回数据
  - 循环查询同一个数据
- 命名规范修改
- 部分文件夹添加 index.ts
  - 通过引入 index.ts 来引入模块
  - 可以减少引用需要的路径
  - 比如: city.repository.ts 文件中的`import {City， CityWithRelations} from '../models/home/city.model';import {Group} from '../models/home/group.model';`就可以合并为`import {City， CityWithRelations， Group} from '../models';`
  - 因为最后 import 会转为 require，不知道是否对打包后体积有影响 -- ❓
- 设置别名
  - 引入 module-alias
  - 在 package.json 中添加\_moduleAliases
  - 在入口文件`import 'module-alias/register'`
  - 在 loopback 设置别名用处不大，不建议设置
- 每次启动都需要重新编译，代码如何热更新
  - 使用 nodemoon 但不能做到只更新修改的代码，只能重新执行 npm start 命令，依然会重新启动服务，浪费很多的打包时间
  - 使用 tsc-watch 能够完成热更新，而不是重新启动服务器
- 增加日志监控，做统一处理
  - 使用 winston 替换 log4js
- 错误类型，返回结果统一定义
- 使用`strong-error-handler`来增强错误提示
- 使用中间件校验 token 和返回结果
- 文件夹说明文档
