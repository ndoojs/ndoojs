/**
 * @namespace
 */
namespace ndoo {
  export let _isDebug = false;

  export class event {
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
    static trigger(eventName: string, callback: Function, data: any) {
      this._temp.push({
        type: this.TYPE_TRIGGER,
        eventName, callback, data
      });
    }
    static off() {}
  }

  export let on = function() {}
  export let trigger = function() {}
  export let off = function() {}

  export const vars: any = {}
  export const func: any = {}
}