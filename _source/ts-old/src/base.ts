import { _lib } from './lib';
import { on, trigger } from './event';

// storage
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

    if (!rewrite && _lib.has(data, key)) {
      return false;
    }

    return data[key] = value;
  }
}

export class router {
  static parse(route: RegExp, url: string, callback: Function) {
    let routeMatch = route.exec(url);
    if (routeMatch != null) {
      callback.apply(null, routeMatch.slice(1));
    }
  }
}

export class base {
  private _pk: number = (+new Date());
  private _blockData = {
    _block: {},
    _app: {},
    _service: {},
    _exist: {}
  }

  router: router;
  storage: storage;

  constructor() {
    this.router = router;
    this.storage = storage;
  }

  private _block(base: string, ns: string, name: string, block?: any) {
    let data: any;
    let nsArr: string[];
    if (base == 'block' || base == 'app' || base == 'service') {
      data = this._blockData[`_${base}`];
    }
    else {
      return false;
    }

    if (ns) {
      nsArr = ns.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
    }
    else {
      nsArr = [];
    }

    let temp = data;
    let result: any;
    let success: boolean;
    if (block || arguments.length > 3) {
      for (let ns in nsArr) {
        temp = temp[ns] || (temp[ns] = {});
      }
      // app/block只允许真值
      if (block && (base === 'app' || base === 'block')) {
        if (typeof block === 'object') {
          if (base === 'app' && temp[name]) {
            result = _lib.defaults(temp[name], block);
          }
          else {
            result = temp[name] = block;
          }
        }
        else if (typeof block === 'function') {
          result = temp[name] = block;
        }
        else {
          result = false;
        }
      }
      else if (base == 'service') {
        result = temp[name] = block;
        success = true;
      }
      else {
        result = false;
      }

      if (result || success) {
        if (ns) {
          this._blockData._exist[`${base}.${ns}.${name}`] = true;
        }
        else {
          this._blockData._exist[`${base}.${name}`] = true;
        }
      }
    }
    else {
      for (let ns in nsArr) {
        if (!_lib.has(temp, ns)) {
          return undefined;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  }
  getPk(prefix: string = '') {
    return `prefix${++this._pk}`;
  }
}
// export namespace _blockData {
  //   export let _block = {};
  //   export let _app = {};
  //   export let _service = {};
  //   export let _exist = {};
  // }

// export let _block = function (base: string, ns: string, name: string, block?: any) {
  //   let data: any;
  //   let nsArr: string[];
  //   if (base == 'block' || base == 'app' || base == 'service') {
  //     data = _blockData[`_${base}`];
  //   }
  //   else {
  //     return false;
  //   }

  //   if (ns) {
  //     nsArr = ns.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
  //   }
  //   else {
  //     nsArr = [];
  //   }

  //   let temp = data;
  //   let result: any;
  //   let success: boolean;
  //   if (block || arguments.length > 3) {
  //     for (let ns in nsArr) {
  //       temp = temp[ns] || (temp[ns] = {});
  //     }
  //     // app/block只允许真值
  //     if (block && (base === 'app' || base === 'block')) {
  //       if (typeof block === 'object') {
  //         if (base === 'app' && temp[name]) {
  //           result = _lib.defaults(temp[name], block);
  //         }
  //         else {
  //           result = temp[name] = block;
  //         }
  //       }
  //       else if (typeof block === 'function') {
  //         result = temp[name] = block;
  //       }
  //       else {
  //         result = false;
  //       }
  //     }
  //     else if (base == 'service') {
  //       result = temp[name] = block;
  //       success = true;
  //     }
  //     else {
  //       result = false;
  //     }

  //     if (result || success) {
  //       if (ns) {
  //         _blockData._exist[`${base}.${ns}.${name}`] = true;
  //       }
  //       else {
  //         _blockData._exist[`${base}.${name}`] = true;
  //       }
  //     }
  //   }
  //   else {
  //     for (let ns in nsArr) {
  //       if (!_lib.has(temp, ns)) {
  //         return undefined;
  //       }
  //       temp = temp[ns];
  //     }
  //     return temp[name];
  //   }
  // }

// export namespace router {
//   export let parse = function (route: RegExp, url: string, callback: Function) {
//     let routeMatch = route.exec(url);
//     if (routeMatch != null) {
//       callback.apply(null, routeMatch.slice(1));
//     }
//   }
// }

// export namespace base {
//   export let require = function(depend: any[], callback: Function, type: string) {
//     if (type.toLowerCase() === 'do') {
//       window['Do'].apply(null, depend.concat(callback));
//     }
//     else if (type.toLowerCase() === 'seajs') {
//       window['seajs'].use(depend, callback);
//     }
//   }
// }



// let _pk = +new Date();
// export let getPk = (prefix: string = '') => prefix+(++_pk);