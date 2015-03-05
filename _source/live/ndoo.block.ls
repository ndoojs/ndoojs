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
  "use strict"
  _        = depend[\_]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage
  _core    = _n.core

  # @TODO
  # - 模块定义
  # - 异步加载
  # - 自动初始化

  _n.on \NBLOCK_LOADED, (elem, namespace=\_default, name, params) ->
    if block = _n.block namespace, name
      if _.isFunction block
        block elem, params
      else if _.isObject block
        block.init elem, params

  _n.initBlock = (elem) !->
    blockId = $(elem).data \nblockId
    _n.router.parse //
      ^(?:\/?)           # ^[/]
      (.*?)              # [:namespace]
      (?:\/?([^/?]+))    # /:block
      (?:\?(.*?))?$      # [?:params]$
    //, blockId, (namespace = \_default, block, params) !~>
      if _n.hasBlock(namespace, block)
        _n.trigger \NBLOCK_LOADED, elem, namespace, block, params
      else
        @require ["#namespace.#block"], !->
          _n.trigger \NBLOCK_LOADED, elem, namespace, block, params
        , \Do

  _n.on \NBLOCK_INIT, !->
    blocks = $ '[data-nblock-id]'
    if blocks.length
      for block in blocks
        auto = $ block .data \nblockAuto
        if auto is 'true'
          _n.initBlock block

  _n.block \test, \main, do
    init: (elem, params) !->
      console.log 'init test block'

  # _n.initBlock('[data-nblock-id]')

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
