import { EventBasic } from './basic';
export class EventApi {
  public event: typeof EventBasic;

  /**
   * global on
   *
   * @method
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {function} callback 事件回调
   * @example // ndoo alias _n
   * var _n = ndoo;
   * _n.on('testEvent', function(data, data2){
   *   console.log(data);
   *   console.log(data2);
   * });
   * _n.trigger('testEvent', 'testEvent', 'kkk');
   */
  public on(eventName: string | string[], callback: Function) {
    eventName = (<string>eventName).split(/\s*,\s*|\s+/);
    for (let e of <string[]>eventName) {
        this.event.on(e, callback);
    }
  }

  /**
   * global trigger
   *
   * @method
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {variable} data 数据，可以是多个
   */
  public trigger(eventName: string | string[], ...data: any[]) {
    let _index = eventName.indexOf(':');
    let type = (<string>eventName).substring(0, _index++) || 'DEFAULT';
    let e = (<string>eventName).substring(_index);

    this.event.trigger(e, type, data);
  }

  /**
   * global off
   *
   * @method
   * @memberof ndoo
   * @param {string} eventName 事件名称
   */
  public off(eventName: string | string[]) {
    eventName = (<string>eventName).split(/\s*,\s*|\s+/);
    for(let e of <string[]>eventName) {
        this.event.off(e);
    }
  }
}