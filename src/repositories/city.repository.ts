import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {City, CityWithRelations, Group} from '../models';
import {GroupRepository} from './group.repository';

export class CityRepository extends DefaultCrudRepository<City, typeof City.prototype.id, CityWithRelations> {
  public readonly groups: HasManyRepositoryFactory<Group, typeof City.prototype.id>;
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('GroupRepository')
    protected groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(City, dataSource);

    this.groups = this.createHasManyRepositoryFactoryFor('groups', groupRepositoryGetter);
    this.registerInclusionResolver('groups', this.groups.inclusionResolver);
  }
}
