(function(){
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /* [home module] {{{ */
  _n.app('home', {
    indexAction: function(param){
      var $content;
      $content = $('#content');
      $content.html('module: home, action: indexAction');
    }
  });
  /* }}} */
}).call(this);
