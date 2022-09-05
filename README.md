# loopback4

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open [~~default url~~](http://127.0.0.1:3000) in your browser.

this project is [new url](http://127.0.0.1:3001)

## Readme detail

- .vscode/ -- vscode 配置 json
  - launch.json -- 运行配置
  - settings.json -- 编辑器设定,项目样式等配置
  - tasks.json -- launch 运行前的任务
- dist/ -- 打包成功后的目录,详情看 src/文件夹
- node_modules/ -- 依赖目录
- public/ -- 静态资源目录,可以放前端的 html,css,js 等文件
- src/ -- 开发目录
  - `__tests__/` -- 测试用例文件夹
  - config/ -- 公共配置 json
    - apiConfig.json -- api 配置
    - datasource.config.json -- 数据库以及远程连接配置
    - loopback.conifg.json -- loopback 服务配置
  - controllers/ -- 控制器,负责提供接口地址,以及接口出入参
    - index.ts -- 统一导出模块
    - 子文件夹 -- 用文件夹解耦不同业务模块
  - datasources/ -- 数据源,负责 mysql 等数据库配置,以及第三方 API 配置
    - index.ts -- 统一导出模块
    - 子文件 -- 数据源
  - events/ -- 处理事件,负责将公共业务以事件驱动模式统一处理
    - index.ts -- 导出 emit 方法
    - 子文件夹 -- 用文件夹解耦不同业务模块
  - middlewares/ -- 中间件,负责请求和响应的操作
    - index.middleware.ts -- 导出中间件
  - models/ -- 表模型,负责定义表字段
    - index.ts -- 统一导出模块
    - 子文件夹 -- 用文件夹解耦不同业务模块
  - observers/ -- 自启动任务
    - jobs/ -- 定时 job
    - 子文件 -- 自启动文件
  - repositories/ 仓库层,负责实际操作数据(crud)
    - index.ts -- 统一导出模块
    - 子文件夹 -- 用文件夹解耦不同业务模块
  - services/ 服务层,负责实际业务逻辑和调用第三方 API,以及插件封装等
    - index.ts -- 统一导出模块
    - plugins/ -- 插件文件夹
    - remotes/ -- 第三方 API
    - 其他子文件夹 -- 实际业务处理逻辑
  - application.ts -- 程序主要配置,以及引入控制器,拦截器,自启动逻辑等模块
  - index.ts -- 程序入口文件
  - migrate.ts -- loopback3 迁移启动文件(loopback3 和 loopback4 版本跨度很大)
  - openapi-spec -- openapi.json 接口说明 json
  - sequence.ts -- 默认中间件文件
- .gitignore -- git 忽略文件
- .yo-rc.json -- yeoman 脚手架工具配置,帮助快速生成工程代码
- Dockerfile -- docker 容器配置文件
- .dockerignore -- docker 忽略文件
- package.json -- node 配置 json
- .eslintignore -- eslint 忽略文件
- .eslintrc.js -- eslint 规则,负责代码质量
- .mocharc.json -- mocharc 测试配置 json
- .prettierignore -- prettier 忽略文件
- .prettier.js -- prettier 规则,负责编码风格
- package-lock.json -- 控制依赖版本 json
- tsconfig.json -- ts 配置 json
- tsconfig.tsbuildinfo -- 存储增量编译信息

## Develop the application

```sh
# generate project
lb4 [<name>]
# generate datasource
lb4 datasource [<name>]
# generate model
lb4 model [<name>]
# generate repository
lb4 repository [<name>]
# generate controller
lb4 controller [<name>]
# generate service
lb4 service [<name>]
# generate model`s relation
lb4 observer [<name>]
# generate observer
lb4 relation [<name>]
```

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](<https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
