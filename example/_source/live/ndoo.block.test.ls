/*
" --------------------------------------------------
"   FileName: ndoo.block.test.ls
"       Desc: test block模块
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
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

_n.block \test, \main, do
  init: (elem, params) !->
    console.log 'init test block'

# _n.initBlock('[data-nblock-id]')

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
