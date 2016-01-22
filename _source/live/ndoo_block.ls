/*
" --------------------------------------------------
"   FileName: ndoo_block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v1.0rc1)
" LastChange: 11/03/2015 23:10
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
 * 检测是否存在指定block
 *
 * @method
 * @name hasBlock
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @return {boolean} 判断block是否存在
 */
_n.hasBlock = (namespace) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, name] = nsmatch
  else
    [namespace, name] = [\_default, namespace]

  _n._blockData[\_exist]["block.#namespace.#name"]

/**
 * 标识指定block
 *
 * @method
 * @name setBlock
 * @memberof ndoo
 * @param {string} namespace 名称空间
 */
_n.setBlock = (namespace) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, name] = nsmatch
  else
    [namespace, name] = [\_default, namespace]

  _n._blockData[\_exist]["block.#namespace.#name"] = true

/**
 * 添加block实现
 *
 * @method
 * @name block
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @param {variable} block 模块实现
 */
_n.block = (namespace, block) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, name] = nsmatch
  else
    [namespace, name] = [\_default, namespace]

  if arguments.length > 1
    _n._block \block, namespace, name, block
  else
    _n._block \block, namespace, name

_n.trigger \STATUS:NBLOCK_DEFINE

_n.on \NBLOCK_LOADED, (elem, namespace=\_default, name, params) ->
  if block = _n.block "#namespace.#name"
    if _.isFunction block.init
      call = !->
        block.init elem, params

      if block.depend
        _n.require [].concat(block.depend), call, \Do
      else
        call!
    else if _.isFunction block
      block elem, params

/**
 * 初始化模块
 *
 * @method
 * @name initBlock
 * @memberof ndoo
 * @param {DOMElement} elem 初始化的元素
 */
_n.initBlock = (elem) !->
  blockId = $(elem).data \nblockId
  blockId = blockId.split /\s*,\s*|\s+/

  _call = (blockId) ->
    @.router.parse //
      ^(?:\/?)           # ^[/]
      (.*?)              # [:controller]
      (?:\/?([^/?#]+))   # /:action
      (?:\?(.*?))?       # [?:params]
      (?:\#(.*?))?$      # [#:hash]$
    //, blockId, (namespace = \_default, block, params) !~>
      pkg = "#namespace.#block"
      if @block pkg
        @trigger \NBLOCK_LOADED, elem, namespace, block, params
      else if _n.hasBlock pkg
        @require ["#namespace.#block"], !->
          _n.trigger \NBLOCK_LOADED, elem, namespace, block, params
        , \Do

  _.each blockId, (id) ->
    _call.call _n, id

_n.on \NBLOCK_INIT, !->
  blocks = $ '[data-nblock-id]'
  if blocks.length
    for block in blocks
      auto = $ block .data \nblockAuto
      if auto is undefined or auto.toString! isnt 'false'
        _n.initBlock block

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
