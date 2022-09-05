import {observerOptions} from '$config/loopback.conifg.json';
import {RemoteProvider, RemoteServiceProp} from '$services';
import {lifeCycleObserver, LifeCycleObserver, service} from '@loopback/core';
import {updateTokenFunc} from './jobs/updateToken';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver(observerOptions.orderedGroups[0])
export class UpdateTokenObserver implements LifeCycleObserver {
  constructor(
    @service(RemoteProvider) protected remoteService: RemoteServiceProp,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    updateTokenFunc(this.remoteService);
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    console.log('updateToken', 'stopped');
  }
}