import {service} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {settingConfig} from '../../config';
import {loggerInstance} from '../../plugins';
import {RemoteProvider, RemoteServiceProp} from '../../services';

const logger = loggerInstance.getLogger('token_job');

export async function updateTokenFunc(remoteService: RemoteServiceProp) {
  try {
    // let result = await remoteService.getToken(
    //   settingConfig.remoteAccount,
    //   settingConfig.remotePassword,
    // );
    // settingConfig.remoteToken = result.accessToken;
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
