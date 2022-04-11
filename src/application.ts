import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, CoreBindings} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import 'module-alias/register';
import path from 'path';
import {observerOptions} from './config/loopbackConifg.json';
import {authMiddleware, resultMiddleware} from './middleware/index.middleware';
import {MySequence} from './sequence';
export {ApplicationConfig};

export class Loopback4Application extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // 手动添加自启动事件
    // this.add(createBindingFromClass(CreateCityObserver));
    // this.add(createBindingFromClass(UpdateTokenObserver));

    // 引入cron组件
    // this.component(CronComponent);
    // 手动添加定时任务
    // this.add(createBindingFromClass(LogJob));
    // this.add(createBindingFromClass(UpdateTokenJob));

    // 请求拦截器
    this.middleware(authMiddleware);
    // 响应拦截器
    this.middleware(resultMiddleware);

    // 规定observers的执行顺序
    this.bind(CoreBindings.LIFE_CYCLE_OBSERVER_OPTIONS).to(observerOptions);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      // 自动引入observers文件夹下的文件到app中
      observers: {
        dirs: ['observers'],
        extensions: ['.js'],
        nested: true,
      },
    };
  }
}
