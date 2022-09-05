import settingConfig from '$config/setting.config.json';
import {logger} from '$plugins/logger.plugin';
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
    logger.info(settingConfig.remoteToken);
  } catch (error) {
    logger.warn('updateTokenJob', error);
  }
}
@cronJob()
export class UpdateTokenJob extends CronJob {
  constructor(@service(RemoteProvider) protected remoteService: RemoteServiceProp) {
    super({
      name: 'updateToken',
      onTick: () => {
        updateTokenFunc(remoteService).catch(error => {
          logger.warn(error);
        });
      },
      cronTime: '0 33 1/8 * * *',
      start: true,
    });
  }
}
