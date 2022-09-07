import {logger} from '../../plugins';

export default class NoticeEvent {
  param: unknown;
  constructor(param: unknown) {
    this.param = param;
  }

  excute() {
    logger.debug('notice param:', this.param);
  }
}
