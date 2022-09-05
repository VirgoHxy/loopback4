import settingConfig from '$config/setting.config.json';
import {RemoteProvider, RemoteServiceProp} from '$services';
import {service} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';

export async function updateTokenFunc(remoteService: RemoteServiceProp) {
  try {
    // let result = await remoteService.getToken(
    //   settingConfig.remoteAccount,
    //   settingConfig.remotePassword,
    // );
    // settingConfig.remoteToken = result.access_token;
    settingConfig.remoteToken = 'token';
    console.log(settingConfig.remoteToken);
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
        updateTokenFunc(remoteService);
      },
      cronTime: '0 33 1/8 * * *',
      start: true,
    });
  }
}
