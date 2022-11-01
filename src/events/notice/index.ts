import {loggerInstance} from '../../plugins';

export default class NoticeEvent {
  private logger = loggerInstance.getLogger('notice_event');
  constructor(public param: unknown) {
    this.param = param;
  }

  excute() {
    this.logger.debug('notice param:', this.param);
  }
}
