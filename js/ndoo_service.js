/*
" --------------------------------------------------
"   FileName: ndoo_block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: ndoo.js(v1.0b1)
" LastChange: 10/24/2015 18:37
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
  _n.service = function(namespace, block, option){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', name], namespace = ref$[0], name = ref$[1];
    }
    return _n._block('service', namespace, name, block);
  };
}).call(this);
