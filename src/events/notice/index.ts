export default class NoticeEvent {
  param: any;
  constructor(param: any) {
    this.param = param;
  }

  excute() {
    console.log('notice:', this.param);
  }
}
