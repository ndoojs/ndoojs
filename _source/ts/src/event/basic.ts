import { getPrepData, PrepDataType } from '../prepData';
let prepData = getPrepData();

/**
 * 事件模块
 *
 * @namespace
 * @name event
 * @memberof ndoo
 * @param {string} name 事件名称
 * @param {string} type 事件类型
 */
export class EventBasic {
  constructor(name: string, type: string) {
    return `#${name}:#${type}`;
  }

  /**
   * 暂存数据类型
   *
   * @name TYPE_ON
   * @memberof ndoo.event
   * @type {number}
   */
  static TYPE_ON:number = 1;

  /**
   * 暂存数据类型
   *
   * @name TYPE_TRIGGER
   * @memberof ndoo.event
   * @type {number}
   */
  static TYPE_TRIGGER:number = 2;

  /**
   * init token
   *
   * @name inited
   * @memberof ndoo.event
   * @type {boolean}
   */
  static inited:boolean = false;

  /**
   * event stack
   *
   * @private
   * @name _temp
   * @memberof ndoo.event
   * @type {array}
   */
  static _temp:Array<any> = prepData ? (prepData as PrepDataType).eventData : [];

  /**
   * on api
   *
   * @method
   * @name on
   * @memberof ndoo.event
   * @param {string} eventName 事件名称
   * @param {function} callback 回调函数
   */
  static on(eventName: string, callback: Function) {
    this._temp.push({
      type: this.TYPE_ON,
      eventName, callback
    })
  }

  /**
   * trigger api
   *
   * @method
   * @name trigger
   * @memberof ndoo.event
   * @param eventName {string} 事件名称
   * @param eventType {string} 事件类型
   * @param data {variable} 数据类型
   */
  static trigger(eventName: string, eventType: string, data: Array<any>) {
    this._temp.push({
      type: this.TYPE_TRIGGER,
      eventName, eventType, data
    });
  }

  /**
   * off api
   *
   * @method
   * @name off
   * @memberof ndoo.event
   * @param eventName {string}
   */
  static off(eventName: string) { }
  static init() {}
}