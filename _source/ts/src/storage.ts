/**
 * 变量存储
 *
 * @method
 * @name storage
 * @memberof ndoo
 * @param {string} key 键名
 * @param {variable} value 值
 * @param {const} option 选项，覆盖或删除
 * @example // alias _stor
 * var _stor = ndoo.storage;
 * // set abc vlaue 1
 * _stor('abc', 1); // 1
 * // set abc value 2 failed
 * _stor('abc', 2); // false
 * // set abc value 2
 * _stor('abc', 2, _stor.REWRITE); // 2
 * // delete abc
 * _stor('abc', null, _stor.DESTROY); // true
 */
export class Storage {
  static _data: any = {};
  /**
   * storage重写常量
   *
   * @memberof ndoo.storage
   */
  static REWRITE: number = 1;

  /**
   * storage删除常量
   *
   * @memberof ndoo.storage
   */
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