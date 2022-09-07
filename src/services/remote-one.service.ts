import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RemoteOneDataSource} from '../datasources';

export interface RemoteOneServiceProp {
  // Add the following property
  getRemoteOneData(body: object): Promise<{status: boolean; data: Object}>;
}

export class RemoteOneProvider implements Provider<RemoteOneServiceProp> {
  constructor(
    @inject('datasources.remoteOne')
    protected dataSource: RemoteOneDataSource = new RemoteOneDataSource(),
  ) {}

  value(): Promise<RemoteOneServiceProp> {
    return getService(this.dataSource);
  }
}
