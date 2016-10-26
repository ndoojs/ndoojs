export class storage {
  static _data: any = {};
  static REWRITE: number = 1;
  static DESTROY: number = 2;
  static _lib: {
      has(data: any, key: string): boolean;
  };

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

    if (!rewrite && storage._lib.has(data, key)) {
      return false;
    }

    return data[key] = value;
  }
}