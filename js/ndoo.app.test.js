(function(_n, depend){
  var _, Backbone, $, _vars, _func, _stor;
  _ = depend['_'];
  Backbone = depend['Backbone'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /* [home module] {{{ */
  _n.on('APP_TEST_ACTION_BEFORE', function(controller, actionName, params){
    console.log('APP_TEST_ACTION_BEFORE');
  });
  _n.app('test', {
    before: {
      filter: 'test',
      only: 'main'
    },
    after: {
      filter: 'afterTest',
      only: 'main'
    },
    testFilter: function(){
      console.log('filter_before!');
    },
    afterTestFilter: function(){
      console.log('filter_after!');
    },
    mainDepend: ['jquery'],
    mainAction: function(param){
      _n.initBlock(document.getElementById('#testBlock'));
      console.log('test/main');
    }
  });
  /* }}} */
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
