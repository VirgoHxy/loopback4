import {CronJob, cronJob} from '@loopback/cron';
import {logger} from '../../plugins';
@cronJob()
export class LogJob extends CronJob {
  constructor() {
    super({
      name: 'log',
      onTick: () => {
        LogJob.func();
      },
      cronTime: '1 * * * * *',
      start: true,
    });
  }
  static func() {
    logger.debug('server is running');
  }
}
