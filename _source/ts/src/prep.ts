import { EventApi } from './event/api';
import { EventBasic } from './event/basic';
import { getPrepData, PrepDataType } from './prepData';
let prepData = getPrepData();

/**
 * ndoojs 全局名称空间，短名称N
 *
 * @namespace ndoo
 */
class Prep extends EventApi {
  public _isDebug: boolean = false;
  public event: typeof EventBasic = EventBasic;

  /**
   * 变量存储名称空间
   *
   * @namespace
   * @name vars
   * @memberof ndoo
   * @type {object}
   * @example // alias _vars
   * var _vars = ndoo.vars;
   * vars.bar = 'bar';
   */
  public vars: any = {};

  /**
   * 函数存储名称空间
   *
   * @namespace
   * @name func
   * @memberof ndoo
   * @type {object}
   * @example // alias _func
   * var _func = ndoo.func;
   * _func.foo = function() {
   *   console.log('foo');
   * }
   */
  public func: any = {};

  /**
   * 依赖库存储空间
   */
  public _lib: any = {};

  constructor() {
    super();
    if (prepData) {
      this.vars = (prepData as PrepDataType).vars;
      this.func = (prepData as PrepDataType).func;
    }
  }
}

export { Prep }