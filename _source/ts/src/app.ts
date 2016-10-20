import { _block, _blockData } from './base';
import { trigger } from './event';
/* define app module {{{ */
/**
 * 检测是否存在指定app
 *
 * @method
 * @name hasApp
 * @memberof ndoo
 * @param {string} ns 名称空间
 * @return {boolean} 是否在存指定的app
 */
export let hasApp = (ns: string) => _blockData._exist[`app.${ns}`]

/**
 * 标识指定app已存在
 *
 * @method
 * @name setApp
 * @memberof ndoo
 * @param {string} namespace 名称空间
 */
export let setApp = (ns: string) => _blockData._exist[`app.${ns}`] = true;

/**
 * 添加app实现
 *
 * @method
 * @name app
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @param {object} controller 控制器
 */
export let app = function (ns: string, app: any) {
  let nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
  let appName: string;
  if (!nsmatch) {
    nsmatch = [, null, ns]
  }
  [, appName, ns] = nsmatch;

  if (arguments.length) {
    return _block('app', ns, appName, app);
  }
  else {
    return _block('app', ns, appName);
  }
}

trigger('STATUS:NAPP_DEFINE')
/* }}} */