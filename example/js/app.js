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
  _n.on('NAPP_EXAMPLE_ACTION_BEFORE', function(controller, actionName, params){
    console.log('NAPP_EXAMPLE_ACTION_BEFORE');
  });
  /* [home module] {{{ */
  _n.app('example', {
    before: {
      filter: 'test, test2',
      only: 'main'
    },
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
      _n.require(['../example/lib/jquery-1.11.1.js', '../example/lib/jquery-mytest.js'], function(a){
        a('body').mytest();
      }, 'seajs');
    }
  });
  /* }}} */
  /* [ndoo module] {{{ */
  _n.app('test', {
    mainAction: function(param){
      console.log('module: test action: mainAction');
    },
    blockTestAction: function(param){
      console.log('module: test action: blockTestAction');
    },
    eventOffAction: function(param){
      _n.on('event_off_test', function(){
        return console.log('event_off_test trigger');
      });
      _n.trigger('event_off_test');
      _n.off('event_off_test');
      console.log('event off');
      _n.trigger('event_off_test');
    }
  });
  /* }}} */
}).call(this);
