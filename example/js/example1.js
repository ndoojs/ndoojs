(function(_n, depend){
  var _, $, _vars, _func, _stor;
  _ = depend['_'];
  $ = depend['$'];
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
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
