import {CronJob, cronJob} from '@loopback/cron';
import {loggerInstance} from '../../plugins';

const logger = loggerInstance.getLogger('log_job');

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
