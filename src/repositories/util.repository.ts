import {DefaultTransactionalRepository, Entity, Filter, Options} from '@loopback/repository';
import {NotFoundError} from '../plugins';

export class DefaultUtilRepository<
  T extends Entity,
  ID,
  Relations extends object = {},
> extends DefaultTransactionalRepository<T, ID, Relations> {
  async returnUpdateAll(entities: T[], options?: Options): Promise<T[]> {
    const name = this.entityClass.name;
    const instances = [];
    // 必须有id才能执行更新
    for (const iterator of entities) {
      if (iterator.getId()) {
        throw new Error(`returnUpdateAll: ${name} entity not have id`);
      }
      const instance = await this.save(iterator, options);
      instances.push(instance);
    }
    return instances;
  }

  async mustFindOne(filter?: Filter<T>, options?: Options): Promise<T & Relations> {
    const entity = await this.findOne(filter, options);
    if (!entity) {
      throw new NotFoundError(
        `Entity not found: ${this.entityClass.name} with ${filter?.where && JSON.stringify(filter.where)}`,
      );
    }
    return entity;
  }
}
