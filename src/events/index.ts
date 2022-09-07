import events from 'events';
import NoticeEvent from './notice';
const eventEmitter = new events.EventEmitter();

export default function emitEvent(eventName: string, param: unknown) {
  eventEmitter.emit(eventName, param);
}

eventEmitter.on('notice', (param: unknown) => {
  setImmediate(() => {
    new NoticeEvent(param).excute();
  });
});
