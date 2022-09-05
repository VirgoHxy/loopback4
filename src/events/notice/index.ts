import {logger} from '$plugins/logger.plugin';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class NoticeEvent {
  param: any;
  constructor(param: any) {
    this.param = param;
  }

  excute() {
    logger.debug('notice param:', this.param);
  }
}
