"use strict"
_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

_n.block \example3, \block, do
  init: (elem, params) !->
    $elem = $ elem
    $elem.text 'block inited'

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
