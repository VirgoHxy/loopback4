import {observerOptions} from '$config/loopback.conifg.json';
import {CityRepository} from '$repositories';
import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
} from '@loopback/core';
import {IsolationLevel, repository} from '@loopback/repository';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver(observerOptions.orderedGroups[1])
export class CreateCityObserver implements LifeCycleObserver {
  constructor(
    // inject `app` if you need access to other artifacts by `await this.app.get()`
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    // inject a repository with key `repositories.${repoName}`
    // or with the shortcut injector:
    // `@repository(CityRepository) private todoRepo: CityRepository`
    @repository(CityRepository) private cityRepo: CityRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    const transaction = await this.cityRepo.dataSource.beginTransaction({
      isolationLevel: IsolationLevel.SERIALIZABLE,
      timeout: 10000,
    });
    try {
      let countResult1 = await this.cityRepo.count({name: 'shanghai'});
      let countResult2 = await this.cityRepo.count({name: 'beijing'});
      const result1 =
        countResult1.count === 0 &&
        (await this.cityRepo.create({name: 'shanghai'}, {transaction}));
      const result2 =
        countResult2.count === 0 &&
        (await this.cityRepo.create({name: 'beijing'}, {transaction}));
      await transaction.commit();
      // await transaction.rollback();
      console.log('createCity', result1, result2);
    } catch (error) {
      console.log('createCity', error);
    }
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    console.log('createCity', 'stopped');
  }
}
