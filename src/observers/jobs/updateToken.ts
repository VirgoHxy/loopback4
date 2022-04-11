import apiConfig from '$config/apiConfig.json';
import {RemoteProvider, RemoteServiceProp} from '$services';
import {service} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';

export function updateTokenFunc() {
  try {
    // let result = await this.remoteService.getToken(
    //   apiConfig.account,
    //   apiConfig.password,
    // );
    // apiConfig.token = result.access_token;
    apiConfig.token = 'token';
    console.log(apiConfig.token);
  } catch (error) {
    console.log('updateTokenJob', error);
  }
}

@cronJob()
export class UpdateTokenJob extends CronJob {
  constructor(
    @service(RemoteProvider) protected remoteService: RemoteServiceProp,
  ) {
    super({
      name: 'updateToken',
      onTick: () => {
        updateTokenFunc();
      },
      cronTime: '0 33 1/8 * * *',
      start: true,
    });
  }
}
