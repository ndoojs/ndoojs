export class EventBasic {
  constructor(name: string, type: string) {
    return `#${name}:#${type}`;
  }
  static TYPE_ON = 1;
  static TYPE_TRIGGER = 2;
  static inited = false;
  static _temp = [];
  static on(eventName: string, callback: Function) {
    this._temp.push({
      type: this.TYPE_ON,
      eventName, callback
    })
  }
  static trigger(eventName: string, eventType: string, data: any[]) {
    this._temp.push({
      type: this.TYPE_TRIGGER,
      eventName, eventType, data
    });
  }
  static off(eventName: string) { }
  static init() {}
}