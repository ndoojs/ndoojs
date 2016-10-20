/*
" --------------------------------------------------
"   FileName: ndoo_service.ls
"       Desc: ndoo.js service模块
"             借鉴了t3.js http://t3js.org/
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 11/03/2015 21:12
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _n, _lib;
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib;
  /**
   * 添加/获取serivce
   *
   * @method
   * @name service
   * @memberof ndoo
   * @param {string}   namespace 名称空间
   * @param {variable} service 对象
   * @example var _n = ndoo;
   * _n.service('user', {
   *   hasSignin: function(){
   *     return false;
   *   }
   * });
   * user = _n.service('user');
   * console.log(user.hasSignin());
   */
  _n.service = function(namespace, service){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
    }
    if (arguments.length > 1) {
      return _n._block('service', namespace, name, service);
    } else {
      service = _n._block('service', namespace, name);
      if (service && _lib.isFunction(service.init)) {
        return service.init(_n);
      } else {
        return service;
      }
    }
  };
  _n.trigger('STATUS:NSERVICE_DEFINE');
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
