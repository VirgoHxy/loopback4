import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config from './remote-one.datasource.config.json';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RemoteOneDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'remoteOne';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.remoteOne', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
