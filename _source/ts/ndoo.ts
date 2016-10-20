/// <references src="./declare.d.ts" />
import * as _ from 'underscore';

export class storage {
  static _data: any = {};
  static REWRITE: number = 1;
  static DESTROY: number = 2;

  constructor(key, value, option: number) {
    let destroy = option & storage.DESTROY;
    let rewrite = option & storage.REWRITE;
    let data = storage._data;

    if (value === undefined) {
      return data[key];
    }

    if (destroy) {
      delete data[key];
    }

    if (!rewrite && _.has(data, key)) {
      return false;
    }

    return data[key] = value;
  }
}

export let require1 = function(depend: any[], callback: Function, type: string) {
  if (type.toLowerCase() === 'do') {
    window['Do'].apply(null, depend.concat(callback));
  }
  else if (type.toLowerCase() === 'seajs') {
    window['seajs'].use(depend, callback);
  }
}

export namespace _blockData {
  export let _block = {};
  export let _app = {};
  export let _service = {};
  export let _exist = {};
}
// _n.require = (depend, callback, type) !->
//   if type.toLowerCase! is \do
//     Do.apply null, depend.concat callback
//   else if type.toLowerCase! is \seajs
//     seajs.use depend, callback