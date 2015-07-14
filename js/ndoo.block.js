/*
" --------------------------------------------------
"   FileName: ndoo.block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /**
   * 检测是否存在指定block
   *
   * @method
   * @name hasBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {string} name 名称
   */
  _n.hasBlock = function(namespace, name){
    namespace == null && (namespace = '_default');
    return _n._blockData['_exist']["block." + namespace + "." + name];
  };
  /**
   * 标识指定block
   *
   * @method
   * @name setBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {string} name 名称
   */
  _n.setBlock = function(namespace, name){
    namespace == null && (namespace = '_default');
    return _n._blockData['_exist']["block." + namespace + "." + name] = true;
  };
  /**
   * 添加block实现
   *
   * @method
   * @name block
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {string} name 名称
   */
  _n.block = function(namespace, name, block){
    namespace == null && (namespace = '_default');
    return _n._block('block', namespace, name, block);
  };
  _n.trigger('STATUS:NBLOCK_DEFINE');
  _n.on('NBLOCK_LOADED', function(elem, namespace, name, params){
    var block;
    namespace == null && (namespace = '_default');
    if (block = _n.block(namespace, name)) {
      if (_.isFunction(block)) {
        return block(elem, params);
      } else if (_.isObject(block)) {
        return block.init(elem, params);
      }
    }
  });
  /**
   * 初始化模块
   *
   * @method
   * @name initBlock
   * @memberof ndoo
   * @param {object} elem 初始化的元素
   */
  _n.initBlock = function(elem){
    var blockId, this$ = this;
    blockId = $(elem).data('nblockId');
    _n.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?]+))(?:\?(.*?))?(?:\#(.*?))?$/, blockId, function(namespace, block, params){
      namespace == null && (namespace = '_default');
      if (_n.hasBlock(namespace, block)) {
        _n.trigger('NBLOCK_LOADED', elem, namespace, block, params);
      } else {
        this$.require([namespace + "." + block], function(){
          _n.trigger('NBLOCK_LOADED', elem, namespace, block, params);
        }, 'Do');
      }
    });
  };
  _n.on('NBLOCK_INIT', function(){
    var blocks, i$, len$, block, auto;
    blocks = $('[data-nblock-id]');
    if (blocks.length) {
      for (i$ = 0, len$ = blocks.length; i$ < len$; ++i$) {
        block = blocks[i$];
        auto = $(block).data('nblockAuto');
        if (auto.toString() === 'true') {
          _n.initBlock(block);
        }
      }
    }
  });
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
