import events from 'events';
import NoticeEvent from './notice';
const eventEmitter = new events.EventEmitter();

export default function emitEvent(eventName: string, param: any) {
  eventEmitter.emit(eventName, param);
}

eventEmitter.on('notice', (param: any) => {
  setImmediate(() => {
    new NoticeEvent(param).excute();
  });
});
