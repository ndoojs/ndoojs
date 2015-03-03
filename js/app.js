(function(_n, depend){
  var _, Backbone, $, _vars, _func, _stor;
  _ = depend['_'];
  Backbone = depend['Backbone'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /* [common prep] {{{ */
  _n.on('PAGE_STATUS_DOMPREP, PAGE_RELOAD', function(){
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
    before: [
      {
        filter: 'test',
        only: 'main'
      }, {
        filter: 'test2',
        only: 'main'
      }
    ],
    after: {
      filter: 'afterTest',
      only: 'main'
    },
    testFilter: function(){
      console.log('filter_before!');
    },
    test2Filter: function(){
      console.log('test2Filter!');
    },
    afterTestFilter: function(){
      console.log('filter_after!');
    },
    mainDepend: ['jquery'],
    mainAction: function(param){
      console.log(param);
      _n.require(['jquery-1.11.1.js', 'jquery-mytest.js'], function(a){
        a('body').mytest();
      }, 'seajs');
    }
  });
  /* }}} */
  /* [ndoo module] {{{ */
  _n.app('ndoo.test', {
    mainAction: function(param){
      console.log('ndoo.test.main');
    }
  });
  /* }}} */
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
