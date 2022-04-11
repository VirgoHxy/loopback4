import {MysqlDataSource} from '$datasources';
import {Common, CommonWithRelations} from '$models';
import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';

export class CommonRepository extends DefaultCrudRepository<
  Common,
  typeof Common.prototype.id,
  CommonWithRelations
> {
  constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
    super(Common, dataSource);
  }
}
