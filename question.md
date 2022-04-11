# question list

- 设置 node.js 后缀文件顺序 ts -> js -> json(类似于webpack.resolve.extensions)❎

# to-do list

- controllers, models, repositories, services 文件夹不分层,就会把所有文件都放在一个文件夹,不易维护 -- ✅
  - 需要在这些文件夹下根据模块继续划分不同的业务文件夹
  - controllers, models, repositories, services 添加子文件夹后导致不能使用命令创建(无法搜寻到模块),需要手动创建文件,再在 index.ts 引入再抛出
- 如何自动引入文件
    - 安装require-all库,通过`module.exports = modules;`来自动化导入
    - 但是只有controllers文件夹适用,其它文件夹报错`index.ts is not a module.` -- ❌
- 如何自定义文件夹且不报错
  - 自定义文件夹后,loopback的一些命令无法找寻到模块的地址 -- ❌
  - 报错的命令有`lb4 repository`, `lb4 controller`, `lb4 service`, `lb4 relation`
- 每次启动都需要重新编译,代码如何热更新 -- ❌
- tsconfig.json 的别名提示需要重新关闭项目才会有提示,import json 文件的属性不会有提示 -- ❌
- 设置别名 -- ✅
  - module-alias 在 package.json 中添加\_moduleAliases
  - 在入口文件`import 'module-alias/register'`
- ts 命名规范修改 -- ✅
- 部分文件夹添加 index.ts -- ✅
  - 通过引入 index.ts 来引入模块
  - 可以减少引用需要的路径
  - 比如: city.repository.ts 文件中的`import {City, CityWithRelations} from '$models/home/city.model';import {Group} from '$models/home/group.model';`就可以合并为`import {City, CityWithRelations, Group} from '$models';`
  - 因为最后 import 会转为 require,不知道是否对打包后体积有影响 -- ❓
- 成功返回,失败返回,错误类型统一定义 失败统一处理 -- ✅
- 文件夹说明文档 -- ✅
