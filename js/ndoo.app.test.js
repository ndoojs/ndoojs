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
  _n.app('ndoo.test', {
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
      console.log("module: ndoo.test action: mainAction");
    }
  });
  /* }}} */
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
