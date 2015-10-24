/*
" --------------------------------------------------
"   FileName: ndoo_block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v1.0b1)
" LastChange: 10/24/2015 18:37
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

_n.service = (namespace, block, option) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, name] = nsmatch
  else
    [namespace, name] = [\_default, name]

  # if block
  #   _n.initService _n._block \service, namespace, name, block
  # else
  #   _n._block \service, namespace, name, block
  _n._block \service, namespace, name, block
