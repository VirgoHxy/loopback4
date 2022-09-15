import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RemoteDataSource} from '../datasources';

export interface RemoteServiceProp {
  // Add the following property
  getToken(username: string, password: string): Promise<{accessToken: string}>;
  getRemoteData(token: string, body: Object): Promise<Object>;
  getTypeDesc(token: string, type: number): Promise<string>;
}

export class RemoteProvider implements Provider<RemoteServiceProp> {
  constructor(
    @inject('datasources.remote')
    protected dataSource: RemoteDataSource = new RemoteDataSource(),
  ) {}

  value(): Promise<RemoteServiceProp> {
    return getService(this.dataSource);
  }
}
