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

  # @TODO
  # - 模块定义
  # - 异步加载
  #

  /* define block package {{{ */
  _n.block = (namespace, name, block) !->
    unless namespace
      ns = _n._blocks['_default'] ||= {}
    else
      ns = _n._blocks[namespace] ||= {}

    if _.isObject block
      _.defaults ns[name] = block
    else if _.isFunction block
      ns[name] = block

  _n._blocks ||= {}

  _n.setBlock = (namespace, blocks) ->
    unless namespace
      ns = _n._blocks['_default'] ||= {}
    else
      ns = _n._blocks[namespace] ||= {}

    for block in blocks
      unless ns[block]
        ns[block] = true

  _n.hasBlock = (block, namespace) ->
    unless namespace
      ns = _n._blocks['_global'] ||= {}
    else
      ns = _n._blocks[namespace] ||= {}

    _.has ns, block

  _n.on \PAGE_BLOCK_LOADED, (elem, blocks, namespace, block, params) ->
    unless namespace
      ns = blocks[\_default]
    else
      ns = blocks[namespace]

    if _.has ns, block
      if _.isFunction ns[block]
        ns[block] elem, params
      else if _.isObject ns[block]
        ns[block].init elem, params

  _n.initBlock = (elem) ->
    blockId = $(elem).data \blockId
    _n.router.parse ':namespace/:block(/:params)', blockId,
    (namespace, block, params) !->
      if _.has(@block, namespace) and _.has @block[namespace], block
        _n.trigger \PAGE_BLOCK_LOADED, elem, _n.block, namespace, block, params
      else
        @require ["ndoo.block.#{namespace}.#{block}"], !->
          _n.trigger \PAGE_BLOCK_LOADED, elem, _n.block, namespace, block, params
        , \Do


  _n.trigger 'STATUS:PAGE_BLOCK_DEFINE'
  /* }}} */

  _n.block \test, \main, do
    init: (elem, params) !->
      console.log 'init test block'

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
