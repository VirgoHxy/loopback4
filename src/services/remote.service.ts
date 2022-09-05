import {RemoteDataSource} from '$datasources';
import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';

export interface RemoteServiceProp {
  // Add the following property
  getToken(username: string, password: string): Promise<{access_token: string}>;
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
