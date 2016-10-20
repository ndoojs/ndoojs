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

"use strict"

@N = @ndoo ||= {}
_n = @ndoo

_lib     = _n._lib

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
_n.service = (namespace, service) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, name] = nsmatch
  else
    [namespace, name] = [\_default, namespace]

  if arguments.length > 1
    _n._block \service, namespace, name, service
  else
    service = _n._block \service, namespace, name
    if service and _lib.isFunction service.init
      service.init _n
    else
      service

_n.trigger \STATUS:NSERVICE_DEFINE

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
