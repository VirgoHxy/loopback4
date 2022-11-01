import {lifeCycleObserver, LifeCycleObserver, service} from '@loopback/core';
import {loopbackConfig} from '../config';
import {loggerInstance} from '../plugins';
import {RemoteProvider, RemoteServiceProp} from '../services';
import {updateTokenFunc} from './jobs/updateToken';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver(loopbackConfig.observerOptions.orderedGroups[0])
export class UpdateTokenObserver implements LifeCycleObserver {
  private logger = loggerInstance.getLogger('token_observer');
  constructor(@service(RemoteProvider) protected remoteService: RemoteServiceProp) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    await updateTokenFunc(this.remoteService);
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    this.logger.info('updateToken', 'stopped');
  }
}
