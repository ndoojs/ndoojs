/*
" --------------------------------------------------
"   FileName: ndoo.block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
((_n, depend) ->
  _        = depend[\_]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage
  _core    = _n.core

  /* define block package {{{ */
  _n.block = (name, block) !->
    _.defaults _n.block[name] ||= {}, block

  _n._blocks ||= {}
  _n.setBlock = (...blocks) ->
    for block in blocks
      unless _n._blocks[block]
        _n._blocks[block] = true

  _n.hasBlock = (block) ->
    _n._blocks[block]

  _n.initBlock = (elem) ->

  _n.trigger 'STATUS:PAGE_BLOCK_DEFINE'
  /* }}} */

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
