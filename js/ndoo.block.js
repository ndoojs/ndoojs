/*
" --------------------------------------------------
"   FileName: ndoo.block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
(function(_n, depend){
  var _, $, _vars, _func, _stor, _core;
  _ = depend['_'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  _core = _n.core;
  /* define block package {{{ */
  _n._blockData || (_n._blockData = {});
  _n._block = function(base, namespace, name, block){
    var data, ref$, nsArr, temp, i$, len$, ns;
    if (base === 'block') {
      data = (ref$ = _n._blockData)['_block'] || (ref$['_block'] = {});
    } else if (base === 'app') {
      data = (ref$ = _n._blockData)['_app'] || (ref$['_app'] = {});
    }
    nsArr = namespace.replace(/^[\/,]|[\/,]$/g, '').split(/[\/,]/);
    temp = data;
    if (block) {
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        temp = temp[ns] || (temp[ns] = {});
      }
      temp[name] || (temp[name] = {});
      if (_.isObject(block)) {
        return _.defaults(temp[name], block);
      } else {
        return temp[name] = block;
      }
    } else {
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        if (!_.has(temp, ns)) {
          false;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  };
  _n.block = function(namespace, name, block){
    namespace == null && (namespace = '_default');
    return _n._block('block', namespace, name, block);
  };
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
  _n.on('PAGE_BLOCK_LOADED', function(elem, namespace, name, params){
    var block;
    namespace == null && (namespace = "_default");
    if (block = _n.block(namespace, name)) {
      if (_.isFunction(block)) {
        return block(elem, params);
      } else if (_.isObject(block)) {
        return block.init(elem, params);
      }
    }
  });
  _n.initBlock = function(elem){
    var blockId, this$ = this;
    blockId = $(elem).data('blockId');
    _n.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?]+))(?:\?(.*?))?$/, blockId, function(namespace, block, params){
      namespace == null && (namespace = '_default');
      if (_n.block(namespace, block)) {
        _n.trigger('PAGE_BLOCK_LOADED', elem, namespace, block, params);
      } else {
        this$.require(["ndoo.block." + namespace + "." + block], function(){
          _n.trigger('PAGE_BLOCK_LOADED', elem, namespace, block, params);
        }, 'Do');
      }
    });
  };
  _n.trigger('STATUS:PAGE_BLOCK_DEFINE');
  /* }}} */
  _n.block('test', 'main', {
    init: function(elem, params){
      console.log('init test block');
    }
  });
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
