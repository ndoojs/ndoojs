(function(){
  'use strict';
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /* [home module] {{{ */
  _n.app('home', {
    indexAction: function(){
      return $('#container').html('hello ndoojs!');
    },
    autoloadAction: function(param){
      var $content;
      $content = $('#content');
      $content.html('module: home, action: indexAction');
    },
    varsAction: function(param){
      var $content;
      $content = $('#content');
      $content.html("getListUrl: " + _vars.getListUrl);
    },
    serviceUsageAction: function(param){
      var user;
      _n.service('user', {
        hasSignin: function(){
          return false;
        }
      });
      user = _n.service('user');
      console.log(user.hasSignin());
    }
  });
  /* }}} */
}).call(this);
