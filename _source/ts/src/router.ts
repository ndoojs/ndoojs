/**
 * 内置路由通过正则配匹各部件
 *
 * @private
 * @namespace
 * @memberof ndoo
 * @type {object}
 */
export class Router {
  /**
   * 路由解析方法
   * 
   * @private
   * @method
   * @memberof ndoo.router
   * @param route {RegExp} 路由正则
   * @param url {string url路径
   * @param callback {Function} 回调函数
   */
  static parse(route: RegExp, url: string, callback: Function) {
    let routeMatch = route.exec(url);
    if (routeMatch != null) {
      callback.apply(null, routeMatch.slice(1));
    }
  }
}