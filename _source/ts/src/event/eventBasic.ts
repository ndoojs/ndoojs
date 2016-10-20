import { getTempData } from '../tempData';
let tempData = getTempData();

export class event {
  constructor(name: string, type: string) {
    return `#${name}:#${type}`;
  }
  static TYPE_ON = 1;
  static TYPE_TRIGGER = 2;
  static inited = false;
  static _temp = tempData.eventTemp;
  static on(eventName: string, callback: Function) {
    event._temp.push({
      type: event.TYPE_ON,
      eventName, callback
    })
  }
  static trigger(eventName: string, callback: Function, data: any) {
    event._temp.push({
      type: event.TYPE_TRIGGER,
      eventName, callback, data
    });
  }
  static off(eventName: string) { }
}