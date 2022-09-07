import {logger} from '../../plugins/logger.plugin';

export default class NoticeEvent {
  param: unknown;
  constructor(param: unknown) {
    this.param = param;
  }

  excute() {
    logger.debug('notice param:', this.param);
  }
}
