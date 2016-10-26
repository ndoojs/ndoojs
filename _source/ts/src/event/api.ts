import { EventBasic } from './basic';
export class EventApi {
  public event: typeof EventBasic;
  public on(eventName: string | string[], callback: Function) {
    eventName = (<string>eventName).split(/\s*,\s*|\s+/);
    for (let e of <string[]>eventName) {
        this.event.on(e, callback);
    }
  }
  public trigger(eventName: string | string[], ...data: any[]) {
    let _index = eventName.indexOf(':');
    let type = (<string>eventName).substring(0, _index++) || 'DEFAULT';
    let e = (<string>eventName).substring(_index);

    this.event.trigger(e, type, data);
  }
  public off(eventName: string | string[]) {
    eventName = (<string>eventName).split(/\s*,\s*|\s+/);
    for(let e of <string[]>eventName) {
        this.event.off(e);
    }
  }
}