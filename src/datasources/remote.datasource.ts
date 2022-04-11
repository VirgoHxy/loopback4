import {RemoteRest} from '$config/datasources.json';
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RemoteDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'remote';
  static readonly defaultConfig = RemoteRest;

  constructor(
    @inject('datasources.config.remote', {optional: true})
    dsConfig: object = RemoteRest,
  ) {
    super(dsConfig);
  }
}
