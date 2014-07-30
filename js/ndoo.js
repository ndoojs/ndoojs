/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
(function(_n, depend){
  var _, $, _vars, _func, _stor, _core;
  _ = depend['_'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  _core = _n.core;
  /* storage module {{{ */
  _n.storage = function(key, value, force, destroy){
    var data;
    data = _n['storage'].data;
    if (value === undefined) {
      return data[key];
    }
    if (destroy) {
      delete data[key];
      return true;
    }
    if (!force && _.has(data, key)) {
      return false;
    }
    return data[key] = value;
  };
  _n.storage.data = {};
  /* }}} */
  /* require module {{{ */
  _n.require = function(depend, callback, type){
    if (type === 'Do') {
      Do.apply(null, depend.concat(callback));
    } else if (type === 'seajs') {
      seajs.use(depend, callback);
    }
  };
  /* }}} */
  /* define app package {{{ */
  _n.app = function(name, app){
    var ref$;
    (ref$ = _n.app)[name] || (ref$[name] = {});
    _.defaults((ref$ = _n.app)[name] || (ref$[name] = {}), app);
  };
  /* }}} */
  /* event module {{{ */
  _n.event = _.extend(_n.event, {
    /* eventHandle {{{ */
    eventHandle: _.extend({
      events: {},
      listened: {}
    }, _core.Events)
    /* }}} */
    /* 覆写on {{{ */,
    on: function(eventName, callback){
      var eventHandle, i$, ref$, len$, item;
      eventHandle = this.eventHandle;
      eventHandle.on(eventName, callback);
      eventHandle.listened[eventName] = true;
      if (_.has(eventHandle.events, "STATUS:" + eventName)) {
        callback(eventHandle.events["STATUS:" + eventName]);
      }
      if (_.has(eventHandle.events, eventName)) {
        for (i$ = 0, len$ = (ref$ = eventHandle.events[eventName]).length; i$ < len$; ++i$) {
          item = ref$[i$];
          callback(item);
        }
      }
    }
    /* }}} */
    /* 覆写tigger {{{ */,
    trigger: function(eventName, eventType, data){
      var eventHandle;
      eventHandle = this.eventHandle;
      if (eventType === 'DEFAULT') {
        eventHandle.trigger(eventName, data);
      } else if (eventType === 'DELAY') {
        if (_.has(eventHandle.listened, eventName)) {
          eventHandle.trigger(eventName, data);
        }
        if (_.has(eventHandle.events, eventName)) {
          if (eventType === 'STATUS') {
            return;
          }
          eventHandle.events[eventName].push(data);
        } else {
          eventHandle.events[eventName] = [data];
        }
      } else if (eventType === 'STATUS') {
        if (!_.has(eventHandle.events, eventType + ":" + eventName)) {
          eventHandle.events[eventType + ":" + eventName] = data;
          if (_.has(eventHandle.listened, eventName)) {
            eventHandle.trigger(eventName, data);
          }
        }
      }
    }
    /* }}} */
    /* 初始化 {{{ */,
    init: function(){
      var i$, ref$, len$, item;
      if (!this.inited) {
        for (i$ = 0, len$ = (ref$ = this._temp).length; i$ < len$; ++i$) {
          item = ref$[i$];
          if (item.type === this.TEMP_ON) {
            this.on(item.eventName, item.callback);
          } else if (item.type === this.TEMP_TRIGGER) {
            this.trigger(item.eventName, item.eventType, item.data);
          }
        }
      }
      this.inited = true;
    }
    /* }}} */
  });
  /* }}} */
  _.extend(_n, {
    /* base {{{ */
    pageId: $('#scriptArea').data('pageId'),
    getPk: function(){
      var _pk;
      _pk = 0;
      return function(){
        return ++_pk;
      };
    }(),
    triggerPageStatus: function(){
      var this$ = this;
      this.trigger('STATUS:PAGE_STATUS_FAST');
      $(function(){
        this$.trigger('STATUS:PAGE_STATUS_DOMPREP');
        this$.trigger('STATUS:PAGE_STATUS_DOM');
        this$.trigger('STATUS:PAGE_STATUS_DOMORLOAD');
      });
      $(window).bind('load', function(){
        return this$.trigger('STATUS:PAGE_STATUS_LOAD');
      });
      this.on('PAGE_STATUS_DOM', function(){
        if (this$.pageId) {
          this$.trigger('STATUS:PAGE_STATUS_ROUTING', this$.pageId);
        }
      });
    }
    /* }}} */
    /* router module {{{ */,
    router: new (_core.Router.extend({
      parse: function(route, url, callback){
        var routeMatch;
        if (!_.isRegExp(route)) {
          route = this._routeToRegExp(route);
        }
        routeMatch = route.exec(url);
        if (routeMatch !== null) {
          callback.apply(null, routeMatch.slice(1));
        }
      }
    })),
    dispatch: function(){
      var this$ = this;
      this.on('PAGE_STATUS_ROUTING', function(data){
        this$.router.parse(':controller/:action(/:params)', data, function(controller, action, params){
          var actionName, depend, run;
          if (_.has(this$.app, controller)) {
            controller = this$.app[controller];
            if (_.has(controller, action + 'Action')) {
              actionName = action;
            } else if (_.has(controller, '_emptyAction')) {
              actionName = '_empty';
            }
            depend || (depend = controller['depend']);
            depend = (depend || []).concat(controller[actionName + 'Depend'] || []);
            run = function(){
              if (actionName) {
                if (_.has(controller, actionName + 'Before')) {
                  controller[actionName + 'Before'](params);
                }
                if (_.has(controller, actionName + 'Action')) {
                  controller[actionName + 'Action'](params);
                }
                if (_.has(controller, actionName + 'After')) {
                  controller[actionName + 'After'](params);
                }
              }
            };
            if (depend && depend.length) {
              this$.require(_.uniq(depend), run, 'Do');
            } else {
              run();
            }
          }
        });
      });
    }
    /* }}} */
    /* init {{{ */,
    init: function(){
      this.event.init();
      this.triggerPageStatus();
      this.dispatch();
    }
    /* }}} */
  });
  _n.init();
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}), {
  _: _,
  $: jQuery
});
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
