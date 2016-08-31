/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 11/03/2015 23:09
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _n;
  if (this.ndoo) {
    return;
  }
  this.N = this.ndoo || (this.ndoo = {});
  /**
   * ndoojs 全局名称空间，短名称N
   *
   * @namespace ndoo
   */
  _n = this.ndoo;
  /**
   * _isDebug 是否开启调试模式
   *
   * @name _isDebug
   * @memberof ndoo
   * @type {boolean}
   */
  _n._isDebug = 0;
  /* event module {{{ */
  _n.event = function(name, type){
    return type + ":" + name;
  };
  /**
   * 事件模块
   *
   * @namespace
   * @name event
   * @memberof ndoo
   * @param {string} name 事件名称
   * @param {string} type 事件类型
   */
  (function(e){
    /**
     * 暂存数据类型
     *
     * @name TYPE_ON
     * @memberof ndoo.event
     * @type {number}
     */
    e == null && (e = _n.event);
    e.TYPE_ON = 1;
    /**
     * 暂存数据类型
     *
     * @name TYPE_TRIGGER
     * @memberof ndoo.event
     * @type {number}
     */
    e.TYPE_TRIGGER = 2;
    /**
     * init token
     *
     * @name inited
     * @memberof ndoo.event
     * @type {boolean}
     */
    e.inited = false;
    /**
     * event stack
     *
     * @private
     * @name _temp
     * @memberof ndoo.event
     * @type {array}
     */
    e._temp = [];
    /**
     * on api
     *
     * @method
     * @name on
     * @memberof ndoo.event
     * @param {string} eventName 事件名称
     * @param {function} callback 回调函数
     */
    e.on = function(eventName, callback){
      this._temp.push({
        type: this.TYPE_ON,
        eventName: eventName,
        callback: callback
      });
    };
    /**
     * trigger api
     *
     * @method
     * @name trigger
     * @memberof ndoo.event
     * @param eventName {string} 事件名称
     * @param eventType {string} 事件类型
     * @param data {variable} 数据类型
     */
    e.trigger = function(eventName, eventType, data){
      this._temp.push({
        type: this.TYPE_TRIGGER,
        eventName: eventName,
        eventType: eventType,
        data: data
      });
    };
    /**
     * off api
     *
     * @method
     * @name off
     * @memberof ndoo.event
     */
    e.off = function(){};
    /* short event
    e.default = (name) -> "DEFAULT:#name"
    e.delay   = (name) -> "DELAY:#name"
    e.status  = (name) -> "STATUS:#name" */
  })();
  /**
   * global on
   *
   * @method
   * @name on
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {function} callback 事件回调
   * @example // ndoo alias _n
   * var _n = ndoo;
   * _n.on('testEvent', function(data, data2){
   *   console.log(data);
   *   console.log(data2);
   * });
   * _n.trigger('testEvent', 'testEvent', 'kkk');
   */
  _n.on = function(eventName, callback){
    /* split 'a, b, c' to ['a', 'b', 'c']
       split 'a b c' to ['a' ,'b', 'c'] */
    var i$, len$, name, results$ = [];
    eventName = eventName.split(/\s*,\s*|\s+/);
    for (i$ = 0, len$ = eventName.length; i$ < len$; ++i$) {
      name = eventName[i$];
      results$.push(this.event.on(name, callback));
    }
    return results$;
  };
  /**
   * global trigger
   *
   * @method
   * @name trigger
   * @memberof ndoo
   * @param {string} eventName 事件名称
   * @param {variable} data 数据，可以是多个
   */
  _n.trigger = function(eventName){
    var data, res$, i$, to$, _index, type, name;
    res$ = [];
    for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    data = res$;
    _index = eventName.indexOf(':');
    type = eventName.substring(0, _index++);
    type || (type = 'DEFAULT');
    name = eventName.substring(_index);
    return this.event.trigger(name, type, data);
  };
  /**
   * global off
   *
   * @method
   * @name off
   * @memberof ndoo
   * @param {string} eventName 事件名称
   */
  _n.off = function(eventName){
    var i$, len$, name, results$ = [];
    eventName = eventName.split(/\s*,\s*|\s+/);
    for (i$ = 0, len$ = eventName.length; i$ < len$; ++i$) {
      name = eventName[i$];
      results$.push(this.event.off(name));
    }
    return results$;
  };
  /* }}} */
  /**
   * 变量存储名称空间
   *
   * @namespace
   * @name vars
   * @memberof ndoo
   * @type {object}
   * @example // alias _vars
   * var _vars = ndoo.vars;
   * vars.bar = 'bar';
   */
  _n.vars || (_n.vars = {});
  /**
   * 函数存储名称空间
   *
   * @namespace
   * @name func
   * @memberof ndoo
   * @type {object}
   * @example // alias _func
   * var _func = ndoo.func;
   * _func.foo = function() {
   *   console.log('foo');
   * }
   */
  _n.func || (_n.func = {});
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo_lib.ls
"       Desc: ndoo.js库文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 08/02/2016 23:41
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, _n, _lib, Backbone, array, slice;
  _ = this['_'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib || (_n._lib = {});
  Backbone = _lib;
  if (this['Backbone']) {
    _lib = this['Backbone'];
    return;
  }
  array = [];
  slice = array.slice;
  
  // Backbone.Events
  // ---------------
  
  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with 'on' or
  // remove with 'off'; 'trigger'-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};
  
  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;
  
  // Iterates over the standard 'event, callback' (as well as the fancy multiple
  // space-separated events '"change blur", callback' and jQuery-style event
  // maps '{event: callback}').
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };
  
  // Bind an event to a 'callback' function. Passing '"all"' will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };
  
  // Guard the 'listening' argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
        context: context,
        ctx: obj,
        listening: listening
    });
  
    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }
  
    return obj;
  };
  
  // Inversion-of-control versions of 'on'. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo =  function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];
  
    // This object is not listening to any other events on 'obj' yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }
  
    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };
  
  // The reducing API that adds a callback to the 'events' object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;
  
      handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
    }
    return events;
  };
  
  // Remove one or many callbacks. If 'context' is null, removes all
  // callbacks with that function. If 'callback' is null, removes all
  // callbacks for the event. If 'name' is null, removes all bound
  // callbacks for all events.
  Events.off =  function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
        context: context,
        listeners: this._listeners
    });
    return this;
  };
  
  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening =  function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;
  
    var ids = obj ? [obj._listenId] : _.keys(listeningTo);
  
    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];
  
      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;
  
      listening.obj.off(name, callback, this);
    }
    if (_.isEmpty(listeningTo)) this._listeningTo = void 0;
  
    return this;
  };
  
  // The reducing API that removes a callback from the 'events' object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;
  
    var i = 0, listening;
    var context = options.context, listeners = options.listeners;
  
    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }
  
    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];
  
      // Bail out if there are no events stored.
      if (!handlers) break;
  
      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }
  
      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    if (_.size(events)) return events;
  };
  
  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once =  function(name, callback, context) {
    // Map the event into a '{event: once}' object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    return this.on(events, void 0, context);
  };
  
  // Inversion-of-control versions of 'once'.
  Events.listenToOnce =  function(obj, name, callback) {
    // Map the event into a '{event: once}' object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };
  
  // Reduces the event callbacks into a map of '{event: onceWrapper}'.
  // 'offer' unbinds the 'onceWrapper' after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };
  
  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as 'trigger' is, apart from the event name
  // (unless you're listening on '"all"', which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger =  function(name) {
    if (!this._events) return this;
  
    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];
  
    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };
  
  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, cb, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };
  
  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };
  
  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;
  
  // Allow the 'Backbone' object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);
  
  
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 08/02/2016 23:41
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, $, _n, _vars, _func, _stor;
  _ = this['_'];
  $ = this['jQuery'] || this['Zepto'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _vars = _n.vars;
  _func = _n.func;
  /* default _lib {{{ */
  if (!_n._lib && this['Backbone']) {
    _n._lib = this['Backbone'];
  }
  /* }}} */
  /* storage module {{{ */
  /**
   * 变量存储
   *
   * @method
   * @name storage
   * @memberof ndoo
   * @param {string} key 键名
   * @param {variable} value 值
   * @param {const} option 选项，覆盖或删除
   * @example // alias _stor
   * var _stor = ndoo.storage;
   * // set abc vlaue 1
   * _stor('abc', 1); // 1
   * // set abc value 2 failed
   * _stor('abc', 2); // false
   * // set abc value 2
   * _stor('abc', 2, _stor.REWRITE); // 2
   * // delete abc
   * _stor('abc', null, _stor.DESTROY); // true
   */
  _n.storage = function(key, value, option){
    var destroy, rewrite, data;
    destroy = option & _n.storage.DESTROY;
    rewrite = option & _n.storage.REWRITE;
    data = _n.storage._data;
    if (value === undefined) {
      return data[key];
    }
    if (destroy) {
      delete data[key];
      return true;
    }
    if (!rewrite && _.has(data, key)) {
      return false;
    }
    data[key] = value;
    return data[key];
  };
  /**
   * alias ndoo.storage
   *
   */
  _stor = _n.storage;
  _n.storage._data = {};
  /**
   * storage重写常量
   *
   * @name REWRITE
   * @memberof ndoo.storage
   */
  _n.storage.REWRITE = 1;
  /**
   * storage删除常量
   *
   * @name DESTROY
   * @memberof ndoo.storage
   */
  _n.storage.DESTROY = 2;
  /* }}} */
  /* require module {{{ */
  /**
   * 依赖加载
   *
   * @method
   * @name require
   * @memberof ndoo
   * @param {array} depend 依赖
   * @param {function} callback 回调函数
   * @param {string} type 加载器类型
   * @example // ndoo alias _n
   * var _n = ndoo;
   * _n.require(['lib/jquery-1.11.1.js', 'lib/jquery-mytest.js'], function(a){
   *   a('body').mytest();
   * }, 'seajs');
   */
  _n.require = function(depend, callback, type){
    if (type.toLowerCase() === 'do') {
      Do.apply(null, depend.concat(callback));
    } else if (type.toLowerCase() === 'seajs') {
      seajs.use(depend, callback);
    }
  };
  /* }}} */
  /* define block module {{{ */
  _n._blockData || (_n._blockData = {
    _block: {},
    _app: {},
    _service: {},
    _exist: {}
  });
  _n._block = function(base, namespace, name, block){
    var data, nsArr, temp, i$, len$, ns, result, success;
    if (base === 'block' || base === 'app' || base === 'service') {
      data = _n._blockData["_" + base];
    } else {
      return false;
    }
    if (namespace) {
      nsArr = namespace.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
    } else {
      nsArr = [];
    }
    temp = data;
    if (block || arguments.length > 3) {
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        temp = temp[ns] || (temp[ns] = {});
      }
      if (block && (base === 'app' || base === 'block')) {
        if (typeof block === 'object') {
          if (base === 'app' && temp[name]) {
            result = _.defaults(temp[name], block);
          } else {
            result = temp[name] = block;
          }
        } else if (typeof block === 'function') {
          result = temp[name] = block;
        } else {
          result = false;
        }
      } else if (base === 'service') {
        result = temp[name] = block;
        success = true;
      } else {
        result = false;
      }
      if (result || success) {
        if (namespace) {
          _n._blockData['_exist'][base + "." + namespace + "." + name] = true;
        } else {
          _n._blockData['_exist'][base + "." + name] = true;
        }
      }
      return result;
    } else {
      for (i$ = 0, len$ = nsArr.length; i$ < len$; ++i$) {
        ns = nsArr[i$];
        if (!_.has(temp, ns)) {
          return undefined;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  };
  /* }}} */
  /* define app module {{{ */
  /**
   * 检测是否存在指定app
   *
   * @method
   * @name hasApp
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @return {boolean} 是否在存指定的app
   */
  _n.hasApp = function(namespace){
    return _n._blockData['_exist']["app." + namespace];
  };
  /**
   * 标识指定app已存在
   *
   * @method
   * @name setApp
   * @memberof ndoo
   * @param {string} namespace 名称空间
   */
  _n.setApp = function(namespace){
    return _n._blockData['_exist']["app." + namespace] = true;
  };
  /**
   * 添加app实现
   *
   * @method
   * @name app
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {object} controller 控制器
   */
  _n.app = function(namespace, controller){
    var nsmatch, controllerName, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], controllerName = nsmatch[2];
    } else {
      ref$ = [namespace, null], controllerName = ref$[0], namespace = ref$[1];
    }
    if (arguments.length > 1) {
      return _n._block('app', namespace, controllerName, controller);
    } else {
      return _n._block('app', namespace, controllerName);
    }
  };
  _n.trigger('STATUS:NAPP_DEFINE');
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
        callback.apply(eventHandle, eventHandle.events["STATUS:" + eventName]);
      }
      if (_.has(eventHandle.events, eventName)) {
        for (i$ = 0, len$ = (ref$ = eventHandle.events[eventName]).length; i$ < len$; ++i$) {
          item = ref$[i$];
          callback.apply(eventHandle, item);
        }
      }
    }
    /* }}} */
    /* off api {{{ */,
    off: function(eventName){
      var eventHandle;
      eventHandle = this.eventHandle;
      eventHandle.off(eventName);
      delete eventHandle.listened[eventName];
      delete eventHandle.events[eventName];
    }
    /* off }}} */
    /* rewrite trigger {{{ */,
    trigger: function(eventName, eventType, data){
      var eventHandle;
      eventHandle = this.eventHandle;
      if (eventType === 'DEFAULT') {
        eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
      } else if (eventType === 'DELAY') {
        if (_.has(eventHandle.listened, eventName)) {
          eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
        }
        if (!_.has(eventHandle.events, eventName)) {
          eventHandle.events[eventName] = [];
        }
        eventHandle.events[eventName].push(data);
      } else if (eventType === 'STATUS') {
        if (!_.has(eventHandle.events, eventType + ":" + eventName)) {
          eventHandle.events[eventType + ":" + eventName] = data;
          if (_.has(eventHandle.listened, eventName)) {
            eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
          }
        }
      }
    }
    /* }}} */
    /* init {{{ */
    /**
     * init 事件初始化
     *
     * @private
     * @name init
     * @memberof ndoo.event
     */,
    init: function(){
      var i$, ref$, len$, item;
      if (!this.inited) {
        for (i$ = 0, len$ = (ref$ = this._temp).length; i$ < len$; ++i$) {
          item = ref$[i$];
          if (item.type === this.TYPE_ON) {
            this.on(item.eventName, item.callback);
          } else if (item.type === this.TYPE_TRIGGER) {
            this.trigger(item.eventName, item.eventType, item.data);
          }
        }
      }
      this.inited = true;
    }
    /* }}} */
  });
  _n.event.init();
  /* }}} */
  _.extend(_n, {
    /* base {{{ */
    /**
     * page id
     *
     * @name pageId
     * @memberof ndoo
     * @type {string}
     */
    pageId: ''
    /**
     * initPageId 初始化 pageId
     *
     * @private
     * @name initPageId
     * @memberof ndoo
     */,
    initPageId: function(id){
      var el;
      if (this.pageId) {
        return;
      }
      if (typeof document !== 'undefined') {
        if (el = document.getElementById(id || 'scriptArea')) {
          this.pageId = el.getAttribute('data-page-id') || '';
        }
      }
      if (!this.pageId && id) {
        this.pageId = id;
      }
    }
    /**
     * 获取唯一key
     *
     * @method
     * @name getPk
     * @memberof ndoo
     * @return {string} 键名
     */,
    getPk: function(){
      var _pk;
      _pk = +new Date();
      return function(prefix){
        prefix == null && (prefix = '');
        return prefix + (++_pk);
      };
    }()
    /* }}} */
    /* router module {{{ */
    /**
     * 内置路由通过正则配匹各部件
     *
     * @private
     * @name router
     * @memberof ndoo
     * @type {object}
     */,
    router: {
      parse: function(route, url, callback){
        var routeMatch;
        routeMatch = route.exec(url);
        if (routeMatch !== null) {
          callback.apply(null, routeMatch.slice(1));
        }
      }
    }
    /* }}} */
    /* dispatch {{{ */
    /**
     * 路由函数
     *
     * @private
     * @method
     * @name dispatch
     * @memberof ndoo
     */,
    dispatch: function(){
      /* before and after filter event */
      var filterHaldner, this$ = this;
      filterHaldner = function(type, controller, actionName, params){
        var data, _data, i$, len$, dataItem, _filter, isRun, _only, _except, j$, len1$, filter, key$;
        if (type === 'before') {
          data = controller.before;
        } else if (type === 'after') {
          data = controller.after;
        }
        if (!data) {
          return;
        }
        if (typeof data === 'object') {
          _data = [].concat(data);
        }
        for (i$ = 0, len$ = _data.length; i$ < len$; ++i$) {
          dataItem = _data[i$];
          /* init filter array */
          _filter = dataItem.filter;
          if (!_.isArray(_filter)) {
            _filter = [].concat(_filter.split(/\s*,\s*|\s+/));
          }
          isRun = true;
          /* init only array */
          if (dataItem.only) {
            _only = dataItem.only;
            if (!_.isArray(_only)) {
              _only = [].concat(_only.split(/\s*,\s*|\s+/));
            }
            if (_.indexOf(_only, actionName) < 0) {
              isRun = false;
            }
            /* init except array */
          } else if (dataItem.except) {
            _except = dataItem.except;
            if (!_.isArray(_except)) {
              _except = [].concat(_except.split(/\s*,\s*|\s+/));
            }
            if (_.indexOf(_except, actionName) > -1) {
              isRun = false;
            }
          }
          if (isRun) {
            for (j$ = 0, len1$ = _filter.length; j$ < len1$; ++j$) {
              filter = _filter[j$];
              if (typeof controller[key$ = filter + 'Filter'] == 'function') {
                controller[key$](actionName, params);
              }
            }
          }
        }
      };
      this.on('NAPP_ACTION_BEFORE', function(){
        var params, res$, i$, to$;
        res$ = [];
        for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        params = res$;
        return filterHaldner.apply(null, ['before'].concat(params));
      });
      this.on('NAPP_ACTION_AFTER', function(){
        var params, res$, i$, to$;
        res$ = [];
        for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        params = res$;
        return filterHaldner.apply(null, ['after'].concat(params));
      });
      /* call action */
      this.on('NAPP_LOADED', function(namespace, controllerName, actionName, params){
        var controller, depend, filterPrefix, run;
        if (namespace) {
          controller = _n.app(namespace + "." + controllerName);
        } else {
          controller = _n.app(controllerName);
        }
        if (!_.has(controller, actionName + "Action") && _.has(controller, '_emptyAction')) {
          actionName = '_empty';
        }
        depend = [];
        if (controller['depend']) {
          depend = depend.concat(controller['depend']);
        }
        if (controller[actionName + 'Depend']) {
          depend = depend.concat(controller[actionName + 'Depend']);
        }
        filterPrefix = controllerName;
        if (namespace) {
          filterPrefix = (namespace + "." + controllerName).replace(/\./g, '_');
        }
        filterPrefix = filterPrefix.toUpperCase();
        run = function(){
          var key$;
          if (actionName) {
            _n.trigger('NAPP_ACTION_BEFORE', controller, actionName, params);
            _n.trigger("NAPP_" + filterPrefix + "_ACTION_BEFORE", controller, actionName, params);
            if (typeof controller[key$ = actionName + 'Before'] == 'function') {
              controller[key$](params);
            }
            if (typeof controller[key$ = actionName + 'Action'] == 'function') {
              controller[key$](params);
            }
            if (typeof controller[key$ = actionName + 'After'] == 'function') {
              controller[key$](params);
            }
            _n.trigger("NAPP_" + filterPrefix + "_ACTION_AFTER", controller, actionName, params);
            _n.trigger('NAPP_ACTION_AFTER', controller, actionName, params);
          }
          _n.trigger('STATUS:NBLOCK_INIT');
        };
        if (depend.length) {
          _n.require(_.uniq(depend), run, 'Do');
        } else {
          run();
        }
      });
      /* page route */
      this.on('PAGE_STATUS_ROUTING', function(data){
        this$.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/, data, function(controller, action, params){
          var nsmatch, namespace, pkg;
          if (nsmatch = controller.match(/(.*?)(?:[/.]([^/.]+))$/)) {
            namespace = nsmatch[1], controller = nsmatch[2];
          } else {
            namespace = void 8;
          }
          if (namespace) {
            namespace = namespace.replace(/\//g, '.');
            pkg = namespace + "." + controller;
          } else {
            pkg = controller;
          }
          if (_n.app(pkg)) {
            this$.trigger('NAPP_LOADED', namespace, controller, action, params);
          } else if (_n.hasApp(pkg)) {
            this$.require([pkg + ""], function(){
              _n.trigger('NAPP_LOADED', namespace, controller, action, params);
            }, 'Do');
          } else {
            this$.trigger('STATUS:NBLOCK_INIT');
          }
        });
      });
    }
    /* }}} */
    /* trigger {{{ */
    /**
     * 触发页面状态
     *
     * @private
     * @method
     * @name triggerPageStatus
     * @memberof ndoo
     */,
    triggerPageStatus: function(depend){
      var call, this$ = this;
      call = function(){
        this$.trigger('STATUS:PAGE_STATUS_FAST');
        $(function(){
          this$.trigger('STATUS:PAGE_STATUS_DOMPREP');
          this$.trigger('STATUS:PAGE_STATUS_DOM');
          this$.trigger('STATUS:PAGE_STATUS_DOMORLOAD');
        });
        $(window).bind('load', function(){
          return this$.trigger('STATUS:PAGE_STATUS_LOAD');
        });
        this$.on('PAGE_STATUS_DOM', function(){
          if (this$.pageId) {
            this$.trigger('STATUS:PAGE_STATUS_ROUTING', this$.pageId);
          }
        });
      };
      if (depend) {
        this.require([].concat(depend), call, 'Do');
      } else {
        call();
      }
    }
    /* }}} */
    /* init {{{ */
    /**
     * 初始化页面
     *
     * @method
     * @name init
     * @memberof ndoo
     * @param {string} id DOM的ID或指定ID
     * @param {array} depend 依赖
     * @example // ndoo alias _n
     * _n.init('home/index')
     * // set depend
     * _n.init('home/index', ['library', 'common'])
     */,
    init: function(id, depend){
      var ref$;
      if (_.isArray(id)) {
        ref$ = ['', id], id = ref$[0], depend = ref$[1];
      }
      this.initPageId(id);
      this.dispatch();
      this.triggerPageStatus(depend);
      return this;
    }
    /* }}} */
  });
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo_block.ls
"       Desc: ndoo.js block模块
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 11/03/2015 23:10
" --------------------------------------------------
*/
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
  /**
   * 检测是否存在指定block
   *
   * @method
   * @name hasBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @return {boolean} 判断block是否存在
   */
  _n.hasBlock = function(namespace){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
    }
    return _n._blockData['_exist']["block." + namespace + "." + name];
  };
  /**
   * 标识指定block
   *
   * @method
   * @name setBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @return {boolean} 设置标识成功
   */
  _n.setBlock = function(namespace){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
    }
    return _n._blockData['_exist']["block." + namespace + "." + name] = true;
  };
  /**
   * 添加block实现
   *
   * @method
   * @name block
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {(object|function)} block 模块实现
   * @return {(boolean|object|function)} 是否成功|标识本身
   */
  _n.block = function(namespace, block){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
    }
    if (arguments.length > 1) {
      return _n._block('block', namespace, name, block);
    } else {
      return _n._block('block', namespace, name);
    }
  };
  _n.trigger('STATUS:NBLOCK_DEFINE');
  _n.on('NBLOCK_LOADED', function(elem, namespace, name, params){
    var block, call;
    namespace == null && (namespace = '_default');
    if (block = _n.block(namespace + "." + name)) {
      if (_.isFunction(block.init)) {
        call = function(){
          block.init(elem, params);
        };
        if (block.depend) {
          return _n.require([].concat(block.depend), call, 'Do');
        } else {
          return call();
        }
      } else if (_.isFunction(block)) {
        return block(elem, params);
      }
    }
  });
  /**
   * 初始化模块
   *
   * @method
   * @name initBlock
   * @memberof ndoo
   * @param {DOMElement} elem 初始化的元素
   */
  _n.initBlock = function(elem){
    var blockId, _call;
    blockId = $(elem).data('nblockId');
    blockId = blockId.split(/\s*,\s*|\s+/);
    _call = function(blockId){
      var this$ = this;
      return this.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/, blockId, function(namespace, block, params){
        var pkg;
        namespace == null && (namespace = '_default');
        namespace = namespace.replace(/\//g, '.');
        pkg = namespace + "." + block;
        if (this$.block(pkg)) {
          this$.trigger('NBLOCK_LOADED', elem, namespace, block, params);
        } else if (_n.hasBlock(pkg)) {
          this$.require([namespace + "." + block], function(){
            _n.trigger('NBLOCK_LOADED', elem, namespace, block, params);
          }, 'Do');
        }
      });
    };
    _.each(blockId, function(id){
      return _call.call(_n, id);
    });
  };
  _n.on('NBLOCK_INIT', function(){
    var blockEl, blocks, i$, len$, el, auto, level, item, block;
    blockEl = $('[data-nblock-id]');
    if (!blockEl.length) {
      return;
    }
    blocks = [];
    for (i$ = 0, len$ = blockEl.length; i$ < len$; ++i$) {
      el = blockEl[i$];
      auto = $(el).data('nblockAuto');
      level = parseInt($(el).data('nblockLevel')) || 5;
      blocks.push([parseInt(level), auto, el]);
    }
    blocks.sort(function(block1, block2){
      return block1[0] > block2[0];
    });
    for (i$ = 0, len$ = blocks.length; i$ < len$; ++i$) {
      item = blocks[i$];
      auto = item[1], block = item[2];
      if (auto === undefined || auto.toString() !== 'false') {
        _n.initBlock(block);
      }
    }
  });
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo_service.ls
"       Desc: ndoo.js service模块
"             借鉴了t3.js http://t3js.org/
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 11/03/2015 21:12
" --------------------------------------------------
*/
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
  /**
   * 添加/获取serivce
   *
   * @method
   * @name service
   * @memberof ndoo
   * @param {string}   namespace 名称空间
   * @param {variable} service 对象
   * @example var _n = ndoo;
   * _n.service('user', {
   *   hasSignin: function(){
   *     return false;
   *   }
   * });
   * user = _n.service('user');
   * console.log(user.hasSignin());
   */
  _n.service = function(namespace, service){
    var nsmatch, name, ref$;
    if (nsmatch = namespace.match(/(.*?)(?:[/.]([^/.]+))$/)) {
      namespace = nsmatch[1], name = nsmatch[2];
    } else {
      ref$ = ['_default', namespace], namespace = ref$[0], name = ref$[1];
    }
    if (arguments.length > 1) {
      return _n._block('service', namespace, name, service);
    } else {
      service = _n._block('service', namespace, name);
      if (service && _.isFunction(service.init)) {
        return service.init(_n);
      } else {
        return service;
      }
    }
  };
  _n.trigger('STATUS:NSERVICE_DEFINE');
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
