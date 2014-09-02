/*
" --------------------------------------------------
"   FileName: ndoo.block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
var slice$ = [].slice;
(function(_n, depend){
  var _, $, _vars, _func, _stor, _core;
  _ = depend['_'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  _core = _n.core;
  /* define block package {{{ */
  _n.block = function(name, block){
    var ref$;
    _.defaults((ref$ = _n.block)[name] || (ref$[name] = {}), block);
  };
  _n._blocks || (_n._blocks = {});
  _n.setBlock = function(){
    var blocks, i$, len$, block, results$ = [];
    blocks = slice$.call(arguments);
    for (i$ = 0, len$ = blocks.length; i$ < len$; ++i$) {
      block = blocks[i$];
      if (!_n._blocks[block]) {
        results$.push(_n._blocks[block] = true);
      }
    }
    return results$;
  };
  _n.hasBlock = function(block){
    return _n._blocks[block];
  };
  _n.initBlock = function(elem){};
  _n.trigger('STATUS:PAGE_BLOCK_DEFINE');
  /* }}} */
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
