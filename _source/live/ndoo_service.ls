/*
" --------------------------------------------------
"   FileName: ndoo_service.ls
"       Desc: ndoo.js service模块
"             借鉴了t3.js http://t3js.org/
"     Author: chenglf
"    Version: ndoo.js(v1.0b2)
" LastChange: 11/03/2015 21:12
" --------------------------------------------------
*/

"use strict"
_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

/**
 * 添加serivce
 *
 * @method
 * @name service
 * @memberof ndoo
 * @param {string}   namespace 名称空间
 * @param {variable} service 对象
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

    if _.has 'init', service and typeof service.init is 'function'
      service.init _n
    else
      service

_n.trigger \STATUS:NSERVICE_DEFINE

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */