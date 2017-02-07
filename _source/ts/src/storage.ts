export class Storage {
  static _data: any = {};
  static REWRITE: number = 1;
  static DESTROY: number = 2;
  static _lib: {
      has(data: any, key: string): boolean;
  };

  constructor(key, value, option: number) {
    let _self = Storage;
    let destroy = option & _self.DESTROY;
    let rewrite = option & _self.REWRITE;
    let data = _self._data;

    if (value === undefined) {
      return data[key];
    }

    if (destroy) {
      delete data[key];
      return true;
    }

    if (!rewrite && _self._lib.has(data, key)) {
      return false;
    }

    return data[key] = value;
  }
}