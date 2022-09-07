import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {City, Group, GroupWithRelations} from '../models';
import {CityRepository} from './city.repository';

export class GroupRepository extends DefaultCrudRepository<Group, typeof Group.prototype.id, GroupWithRelations> {
  public readonly city: BelongsToAccessor<City, typeof Group.prototype.id>;
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('CityRepository')
    protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Group, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
  }
}
