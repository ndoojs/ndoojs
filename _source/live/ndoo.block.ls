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
  _n._blockData ||= {}

  _n._block = (base, namespace, name, block) ->
    if base is \block
      data = _n._blockData[\_block] ||= {}
    else if base is \app
      data = _n._blockData[\_app] ||= {}

    nsArr = namespace.replace /^[\/,]|[\/,]$/g, '' .split /[\/,]/
    temp = data

    if block
      for ns in nsArr
        temp = temp[ns] ||= {}
      temp[name] ||= {}
      if _.isObject block
        _.defaults temp[name], block
      else
        temp[name] = block
    else
      for ns in nsArr
        unless _.has temp, ns
          false
        temp = temp[ns]
      temp[name]

  _n.block = (namespace=\_default, name, block) ->
    _n._block \block, namespace, name, block

  # _n.app = (namespace, name, block) ->
  #   _n._block \app, namespace, name, block

  # _blocks._default
  # _blocks._app
  # _blocks.some
  /*
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
      ns = _n._blocks['_default'] ||= {}
    else
      ns = _n._blocks[namespace] ||= {}

    _.has ns, block
  */
  _n.on \PAGE_BLOCK_LOADED, (elem, namespace="_default", name, params) ->
    if block = _n.block namespace, name
      if _.isFunction block
        block elem, params
      else if _.isObject block
        block.init elem, params

  _n.initBlock = (elem) !->
    blockId = $(elem).data \blockId
    _n.router.parse //
      ^(?:\/?)           # ^[/]
      (.*?)              # [:namespace]
      (?:\/?([^/?]+))    # /:block
      (?:\?(.*?))?$      # [?:params]$
    //, blockId, (namespace = '_default', block, params) !~>
      if _n.block(namespace, block)
        _n.trigger \PAGE_BLOCK_LOADED, elem, namespace, block, params
      else
        @require ["ndoo.block.#{namespace}.#{block}"], !->
          _n.trigger \PAGE_BLOCK_LOADED, elem, namespace, block, params
        , \Do

  _n.trigger 'STATUS:PAGE_BLOCK_DEFINE'
  /* }}} */

  _n.block \test, \main, do
    init: (elem, params) !->
      console.log 'init test block'

  # _n.initBlock('[data-ndoo-block]')

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
