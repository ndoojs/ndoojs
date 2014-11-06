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
  "use strict";
  var _, $, _vars, _func, _stor;
  _ = depend['_'];
  $ = depend['$'];
  _vars = _n.vars;
  _func = _n.func;
  _stor = _n.storage;
  /* storage module {{{ */
  _n._storageData = {};
  _n.storage = function(key, value, force, destroy){
    var data;
    data = _n['_storageDate'];
    if (value === void 8) {
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
  /* define block module {{{ */
  _n._blockData || (_n._blockData = {
    _block: {},
    _app: {},
    _exist: {}
  });
  _n._block = function(base, namespace, name, block){
    var data, nsArr, temp, i$, len$, ns;
    if (base === 'block') {
      data = _n._blockData['_block'];
    } else if (base === 'app') {
      data = _n._blockData['_app'];
    }
    if (namespace) {
      nsArr = namespace.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
    } else {
      nsArr = [];
    }
    temp = data;
    if (block) {
      if (namespace) {
        _n._blockData['_exist'][base + "." + namespace + "." + name] = true;
      } else {
        _n._blockData['_exist'][base + "." + name] = true;
      }
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        temp = temp[ns] || (temp[ns] = {});
      }
      temp[name] || (temp[name] = {});
      if (_.isObject(block)) {
        return _.defaults(temp[name], block);
      } else {
        return temp[name] = block;
      }
    } else {
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        if (!_.has(temp, ns)) {
          false;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  };
  _n.hasBlock = function(namespace, name){
    namespace == null && (namespace = '_default');
    return _n._blockData['_exist']["block." + namespace + "." + name];
  };
  _n.setBlock = function(namespace, name){
    namespace == null && (namespace = '_default');
    return _n._blockData['_exist']["block." + namespace + "." + name] = true;
  };
  _n.block = function(namespace, name, block){
    namespace == null && (namespace = '_default');
    return _n._block('block', namespace, name, block);
  };
  _n.trigger('STATUS:PAGE_BLOCK_DEFINE');
  /* }}} */
  /* define app module {{{ */
  _n.hasApp = function(namespace){
    return _n._blockData['_exist']["app." + namespace];
  };
  _n.setApp = function(namespace){
    return _n._blockData['_exist']["app." + namespace] = true;
  };
  _n.app = function(namespace, controller){
    var nsmatch, controllerName, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], controllerName = nsmatch[2];
    } else {
      ref$ = [namespace, null], controllerName = ref$[0], namespace = ref$[1];
    }
    return _n._block('app', namespace, controllerName, controller);
  };
  _n.trigger('STATUS:PAGE_APP_DEFINE');
  /* }}} */
  /* event module {{{ */
  _n.event = _.extend(_n.event, {
    /* eventHandle {{{ */
    eventHandle: _.extend({
      events: {},
      listened: {}
    }, _n._lib.Events)
    /* }}} */
    /* rewrite on {{{ */,
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
    /* rewrite igger {{{ */,
    trigger: function(eventName, eventType, data){
      var eventHandle;
      eventHandle = this.eventHandle;
      if (eventType === 'DEFAULT') {
        eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
      } else if (eventType === 'DELAY') {
        if (_.has(eventHandle.listened, eventName)) {
          eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
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
    /* init {{{ */,
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
      _pk = +new Date();
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
    router: new (_n._lib.Router.extend({
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
    }))
    /* }}} */
    /* dispatch {{{ */,
    dispatch: function(){
      /* before and after filter event */
      var this$ = this;
      this.on('APP_ACTION_BEFORE APP_ACTION_AFTER', function(data, controller, actionName, params){
        var isRun, i$, ref$, len$, filter;
        if (data) {
          /* init filter array */
          if (!_.isArray(data.filter)) {
            data.filter = [].concat(data.filter);
          }
          isRun = true;
          /* init only array */
          if (data.only) {
            if (!_.isArray(data.only)) {
              data.only = [].concat(data.only);
            }
            if (_.indexOf(data.only, actionName) < 0) {
              isRun = false;
            }
            /* init except array */
          } else if (data.except) {
            if (!_.isArray(data.except)) {
              data.except = [].concat(data.except);
            }
            if (_.indexOf(data.except, actionName) > -1) {
              isRun = false;
            }
          }
          if (isRun) {
            for (i$ = 0, len$ = (ref$ = data.filter).length; i$ < len$; ++i$) {
              filter = ref$[i$];
              controller[filter + 'Filter'](params);
            }
          }
        }
      });
      /* call action */
      this.on('PAGE_APP_LOADED', function(namespace, controllerName, actionName, params){
        var controller, depend, before, after, run;
        if (namespace) {
          controller = _n.app(namespace + "." + controllerName);
        } else {
          controller = _n.app(controllerName);
        }
        if (!_.has(controller, actionName + "Action") && _.has(controller, '_emptyAction')) {
          actionName = '_empty';
        }
        depend || (depend = controller['depend']);
        depend = (depend || []).concat(controller[actionName + 'Depend'] || []);
        before = controller.before;
        after = controller.after;
        run = function(){
          if (actionName) {
            _n.trigger('APP_ACTION_BEFORE', before, controller, actionName, params);
            _n.trigger("APP_" + controllerName.toUpperCase() + "_ACTION_BEFORE", controller, actionName, params);
            if (_.has(controller, actionName + 'Before')) {
              controller[actionName + 'Before'](params);
            }
            if (_.has(controller, actionName + 'Action')) {
              controller[actionName + 'Action'](params);
            }
            if (_.has(controller, actionName + 'After')) {
              controller[actionName + 'After'](params);
            }
            _n.trigger("APP_" + controllerName.toUpperCase() + "_ACTION_AFTER", controller, actionName, params);
            _n.trigger('APP_ACTION_AFTER', after, controller, actionName, params);
          }
        };
        if (depend && depend.length) {
          _n.require(_.uniq(depend), run, 'Do');
        } else {
          run();
        }
      });
      /* page route */
      this.on('PAGE_STATUS_ROUTING', function(data){
        this$.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?]+))(?:\?(.*?))?$/, data, function(controller, action, params){
          var nsmatch, namespace, pkg;
          if (nsmatch = controller.match(/(.*?)(?:[/.]([^/.]+))$/)) {
            namespace = nsmatch[1], controller = nsmatch[2];
          } else {
            namespace = void 8;
          }
          if (namespace) {
            pkg = namespace + "." + controller;
          } else {
            pkg = controller;
          }
          if (_n.app(pkg)) {
            this$.trigger('PAGE_APP_LOADED', namespace, controller, action, params);
          } else if (_n.hasApp(pkg)) {
            this$.require(["ndoo.app." + pkg], function(){
              _n.trigger('PAGE_APP_LOADED', namespace, controller, action, params);
            }, 'Do');
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
