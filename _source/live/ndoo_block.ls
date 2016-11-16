/*
" --------------------------------------------------
"   FileName: ndoo_block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 14:11
" --------------------------------------------------
*/

"use strict"

@N = @ndoo ||= {}
_n = @ndoo

_lib     = _n._lib

/**
 * 检测是否存在指定block
 *
 * @private
 * @name _blockExist
 * @param {string} ns 名称空间
 * @param {set} boolean 是否标记block已存在
 * @return {boolean} 返加block标记
 */
_blockExist = (ns, set) ->
  nsmatch = ns.match /(.*?)(?:[/.]([^/.]+))$/
  unless nsmatch
    nsmatch = [, \_default, ns]

  [, ns, name] = nsmatch

  if set
    _n._blockData[\_exist]["block.#ns.#name"] = true;
  else
    _n._blockData[\_exist]["block.#ns.#name"]

/**
 * 检测是否存在指定block
 *
 * @method
 * @name hasBlock
 * @memberof ndoo
 * @param {string} ns 名称空间
 * @return {boolean} 判断block是否存在
 */
_n.hasBlock = (namespace) ->
  _blockExist namespace

/**
 * 标识指定block
 *
 * @method
 * @name setBlock
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @return {boolean} 设置标识成功
 */
_n.setBlock = (namespace) ->
  _blockExist namespace, true

/**
 * 添加block实现
 *
 * @method
 * @name block
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @param {(object|function)} block 模块实现
 * @return {(boolean|object|function)} 是否成功|标识本身
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
    if _lib.isFunction block.init
      call = !->
        block.init elem, params

      if block.depend
        _n.require [].concat(block.depend), call, \Do
      else
        call!
    else if _lib.isFunction block
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
  blockId = _lib.data elem, \nblockId
  blockId = blockId.split /\s*,\s*|\s+/

  _call = (blockId) ->
    @.router.parse //
      ^(?:\/?)           # ^[/]
      (.*?)              # [:controller]
      (?:\/?([^/?#]+))   # /:action
      (?:\?(.*?))?       # [?:params]
      (?:\#(.*?))?$      # [#:hash]$
    //, blockId, (namespace = \_default, block, params) !~>
      namespace = namespace.replace(/\//g, '.');
      pkg = "#namespace.#block"
      if @block pkg
        @trigger \NBLOCK_LOADED, elem, namespace, block, params
      else if _n.hasBlock pkg
        @require ["#namespace.#block"], !->
          _n.trigger \NBLOCK_LOADED, elem, namespace, block, params
        , \Do

  _lib.each blockId, (id) ->
    _call.call _n, id

_n.on \NBLOCK_INIT, !->
  blockEl = _lib.querySelector '[data-nblock-id]'
  if not blockEl or not blockEl.length
    return
  blocks = []
  for el in blockEl
    auto =  _lib.data el, \nblockAuto
    level = parseInt( _lib.data el, \nblockLevel ) or 5
    blocks.push [level, auto, el]

  blocks = blocks.sort (block1, block2) -> block1[0] - block2[0]

  for item in blocks
    [,auto, block] = item
    if auto is undefined or auto.toString! isnt 'false'
      _n.initBlock block

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
