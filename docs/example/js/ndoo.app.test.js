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
  /* [home module] {{{ */
  _n.on('NAPP_NDOO_TEST_ACTION_BEFORE', function(controller, actionName, params){
    console.log('NAPP_NDOO_TEST_ACTION_BEFORE');
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
}).call(this);
