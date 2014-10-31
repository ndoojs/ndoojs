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
  _n.block = function(namespace, name, block){
    var ns, ref$;
    if (!namespace) {
      ns = (ref$ = _n._blocks)['_default'] || (ref$['_default'] = {});
    } else {
      ns = (ref$ = _n._blocks)[namespace] || (ref$[namespace] = {});
    }
    if (_.isObject(block)) {
      _.defaults(ns[name] = block);
    } else if (_.isFunction(block)) {
      ns[name] = block;
    }
  };
  _n.block.pack = function(key, value){
    var keys, _blocks, i$, len$, item;
    keys = key.replace(/^[\/,]|[\/,]$/g, '').split(/[\/,]/);
    _blocks = _n._blocks;
    for (i$ = 0, len$ = keys.length; i$ < len$; ++i$) {
      item = keys[i$];
      _blocks[item] || (_blocks[item] = {});
    }
    if (value) {
      return _blocks[item](value);
    } else {
      return _blocks[item];
    }
  };
  _n._blocks || (_n._blocks = {});
  _n.setBlock = function(namespace, blocks){
    var ns, ref$, i$, len$, block, results$ = [];
    if (!namespace) {
      ns = (ref$ = _n._blocks)['_default'] || (ref$['_default'] = {});
    } else {
      ns = (ref$ = _n._blocks)[namespace] || (ref$[namespace] = {});
    }
    for (i$ = 0, len$ = blocks.length; i$ < len$; ++i$) {
      block = blocks[i$];
      if (!ns[block]) {
        results$.push(ns[block] = true);
      }
    }
    return results$;
  };
  _n.hasBlock = function(block, namespace){
    var ns, ref$;
    if (!namespace) {
      ns = (ref$ = _n._blocks)['_default'] || (ref$['_default'] = {});
    } else {
      ns = (ref$ = _n._blocks)[namespace] || (ref$[namespace] = {});
    }
    return _.has(ns, block);
  };
  _n.on('PAGE_BLOCK_LOADED', function(elem, blocks, namespace, block, params){
    var ns;
    if (!namespace) {
      ns = blocks['_default'];
    } else {
      ns = blocks[namespace];
    }
    if (_.has(ns, block)) {
      if (_.isFunction(ns[block])) {
        return ns[block](elem, params);
      } else if (_.isObject(ns[block])) {
        return ns[block].init(elem, params);
      }
    }
  });
  _n.initBlock = function(elem){
    var blockId, this$ = this;
    blockId = $(elem).data('blockId');
    _n.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?]+))(?:\?(.*?))?$/, blockId, function(namespace, block, params){
      if (_.has(this$._blocks, namespace) && _.has(this$._blocks[namespace], block)) {
        _n.trigger('PAGE_BLOCK_LOADED', elem, _n._blocks, namespace, block, params);
      } else {
        this$.require(["ndoo.block." + namespace + "." + block], function(){
          _n.trigger('PAGE_BLOCK_LOADED', elem, _n._blocks, namespace, block, params);
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
