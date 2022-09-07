import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, CoreBindings} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {loopbackConfig} from './config';
import {MySequence} from './sequence';
export {ApplicationConfig};

export class Loopback4Application extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // add bearer token button

    this.addSecuritySpec();

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // 规定observers的执行顺序
    this.bind(CoreBindings.LIFE_CYCLE_OBSERVER_OPTIONS).to(loopbackConfig.observerOptions);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      // 自动引入observers文件夹下的文件到app中，开启了jobs和启动任务
      observers: {
        dirs: ['observers'],
        extensions: ['.js'],
        nested: true,
      },
    };
  }

  public addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: require('../package.json').name,
        version: require('../package.json').version,
      },
      paths: {},
      components: {
        securitySchemes: {
          jwt: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }
}
