(function(_n, depend){
  var _, Backbone, $, _vars, _func, _stor;
  _ = depend['_'];
  Backbone = depend['Backbone'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /* [common prep] {{{ */
  _n.on('PAGE_STATUS_DOMPREP', 'PAGE_RELOAD', function(){
    var init_tpl;
    init_tpl = function(){
      var $code, text, e;
      $code = $('#tplCode');
      if ($code.length) {
        text = $code.get(0).text;
        if (text.replace(/^\s*$/g, '') !== '') {
          try {
            $(text).appendTo('body');
          } catch (e$) {
            e = e$;
            return false;
          }
        }
      }
      return true;
    };
    /* init template */
  });
  /* }}} */
  /* [home module] {{{ */
  _n.app('example', {
    mainDepend: ['jquery'],
    mainAction: function(param){
      console.log(param);
    }
  });
  /* }}} */
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
