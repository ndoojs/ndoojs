/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 14:11
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
  /**
   * 依赖库存储空间
   */
  _n._lib || (_n._lib = {});
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo_lib_depend.ls
"       Desc: ndoo.js库依赖文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 11:11
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, _n, _lib, $;
  _ = this['_'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib;
  $ = this['jQuery'] || this['Zepto'];
  _.extend(_lib, _);
  _lib.extend(_lib, {
    onready: function(callback){
      if ($) {
        $(callback);
      } else if (window.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback, false);
      }
    },
    onload: function(callback){
      if ($) {
        $(window).on('load', callback);
      } else if (window.addEventListener) {
        addEventListener('load', callback, false);
      }
    },
    querySelector: function(selector){
      if ($) {
        return $(selector).slice(0);
      } else if (document.querySelectorAll) {
        return document.querySelectorAll(selector);
      }
    },
    data: function(elem, key, value){
      var type;
      type = arguments.length;
      if ($) {
        if (type === 2) {
          return $(elem).data(key);
        } else if (type === 3) {
          return $(elem).data(key, value);
        }
      } else {
        if (!elem.dataset) {
          key = key.replace(/([A-Z])/g, function(char){
            return '-' + char.toLowerCase();
          });
        }
        if (type === 2) {
          if (elem.dataset) {
            return elem.dataset[key];
          } else {
            return elem.getAttribute(key);
          }
        } else if (type === 3) {
          if (elem.dataset) {
            return elem.dataset[key] = value;
          } else {
            return elem.setAttribute(key, value);
          }
        }
      }
    }
  });
}).call(this);
/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 11/16/2016 20:05
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _n, _lib, _stor;
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib;
  /* default _lib {{{ */
  if (!_n._lib.Events && this['Backbone']) {
    _n._lib.Events = this['Backbone'];
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
    if (!rewrite && _lib.has(data, key)) {
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
    var loader;
    type == null && (type = 'loader');
    if (type.toLowerCase() === 'do') {
      Do.apply(null, depend.concat(callback));
    } else if (type.toLowerCase() === 'seajs') {
      seajs.use(depend, callback);
    } else {
      loader = _n._loader[type];
      if (loader) {
        loader(depend, callback);
      }
    }
  };
  _n._loader = {
    app: '',
    block: ''
  };
  _n.setLoader = function(type, loader){
    if (type === 'app') {
      _n._loader['app'] = 'appLoader';
      return _n._loader['appLoader'] = loader;
    } else if (type === 'block') {
      _n._loader['block'] = 'blockLoader';
      return _n._loader['blockLoader'] = loader;
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
            result = _lib.defaults(temp[name], block);
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
        if (!_lib.has(temp, ns)) {
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
  _n.event = _lib.extend(_n.event, {
    /* eventHandle {{{ */
    eventHandle: _lib.extend({
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
      if (_lib.has(eventHandle.events, "STATUS:" + eventName)) {
        callback.apply(eventHandle, eventHandle.events["STATUS:" + eventName]);
      }
      if (_lib.has(eventHandle.events, eventName)) {
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
        if (_lib.has(eventHandle.listened, eventName)) {
          eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
        }
        if (!_lib.has(eventHandle.events, eventName)) {
          eventHandle.events[eventName] = [];
        }
        eventHandle.events[eventName].push(data);
      } else if (eventType === 'STATUS') {
        if (!_lib.has(eventHandle.events, eventType + ":" + eventName)) {
          eventHandle.events[eventType + ":" + eventName] = data;
          if (_lib.has(eventHandle.listened, eventName)) {
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
  _lib.extend(_n, {
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
          if (!_lib.isArray(_filter)) {
            _filter = [].concat(_filter.split(/\s*,\s*|\s+/));
          }
          isRun = true;
          /* init only array */
          if (dataItem.only) {
            _only = dataItem.only;
            if (!_lib.isArray(_only)) {
              _only = [].concat(_only.split(/\s*,\s*|\s+/));
            }
            if (_lib.indexOf(_only, actionName) < 0) {
              isRun = false;
            }
            /* init except array */
          } else if (dataItem.except) {
            _except = dataItem.except;
            if (!_lib.isArray(_except)) {
              _except = [].concat(_except.split(/\s*,\s*|\s+/));
            }
            if (_lib.indexOf(_except, actionName) > -1) {
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
        var controller, depend, filterPrefix, run, loader;
        if (namespace) {
          controller = _n.app(namespace + "." + controllerName);
        } else {
          controller = _n.app(controllerName);
        }
        if (!_lib.has(controller, actionName + "Action") && _lib.has(controller, '_emptyAction')) {
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
          var args, ref$, ref1$, ref2$;
          args = [].slice.call(arguments, 0);
          args = [params].concat(args);
          if (actionName) {
            _n.trigger('NAPP_ACTION_BEFORE', controller, actionName, params);
            _n.trigger("NAPP_" + filterPrefix + "_ACTION_BEFORE", controller, actionName, params);
            if ((ref$ = controller[actionName + 'Before']) != null) {
              ref$.apply(controller, args);
            }
            if ((ref1$ = controller[actionName + 'Action']) != null) {
              ref1$.apply(controller, args);
            }
            if ((ref2$ = controller[actionName + 'After']) != null) {
              ref2$.apply(controller, args);
            }
            _n.trigger("NAPP_" + filterPrefix + "_ACTION_AFTER", controller, actionName, params);
            _n.trigger('NAPP_ACTION_AFTER', controller, actionName, params);
          }
          _n.trigger('STATUS:NBLOCK_INIT');
        };
        if (depend.length) {
          loader = controller['loader'] || _n._loader['app'] || 'Do';
          _n.require(_lib.uniq(depend), run, loader);
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
        _lib.onready(function(){
          this$.trigger('STATUS:PAGE_STATUS_DOMPREP');
          this$.trigger('STATUS:PAGE_STATUS_DOM');
          this$.trigger('STATUS:PAGE_STATUS_DOMORLOAD');
        });
        _lib.onload(function(){
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
      if (_lib.isArray(id)) {
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
" LastChange: 10/19/2016 14:11
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _n, _lib, _blockExist;
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib;
  /**
   * 检测是否存在指定block
   *
   * @private
   * @name _blockExist
   * @param {string} ns 名称空间
   * @param {set} boolean 是否标记block已存在
   * @return {boolean} 返加block标记
   */
  _blockExist = function(ns, set){
    var nsmatch, name;
    nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
    if (!nsmatch) {
      nsmatch = [void 8, '_default', ns];
    }
    ns = nsmatch[1], name = nsmatch[2];
    if (set) {
      return _n._blockData['_exist']["block." + ns + "." + name] = true;
    } else {
      return _n._blockData['_exist']["block." + ns + "." + name];
    }
  };
  /**
   * 检测是否存在指定block
   *
   * @method
   * @name hasBlock
   * @memberof ndoo
   * @param {string} ns 名称空间
   * @return {boolean} 判断block是否存在
   */
  _n.hasBlock = function(namespace){
    return _blockExist(namespace);
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
    return _blockExist(namespace, true);
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
    var block, call, loader;
    namespace == null && (namespace = '_default');
    if (block = _n.block(namespace + "." + name)) {
      if (_lib.isFunction(block.init)) {
        call = function(){
          block.init(elem, params);
        };
        if (block.depend) {
          loader = block.loader || _n._loader['block'] || 'Do';
          return _n.require([].concat(block.depend), call, loader);
        } else {
          return call();
        }
      } else if (_lib.isFunction(block)) {
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
    blockId = _lib.data(elem, 'nblockId');
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
    _lib.each(blockId, function(id){
      return _call.call(_n, id);
    });
  };
  _n.on('NBLOCK_INIT', function(){
    var blockEl, blocks, i$, len$, el, auto, level, item, block;
    blockEl = _lib.querySelector('[data-nblock-id]');
    if (!blockEl || !blockEl.length) {
      return;
    }
    blocks = [];
    for (i$ = 0, len$ = blockEl.length; i$ < len$; ++i$) {
      el = blockEl[i$];
      auto = _lib.data(el, 'nblockAuto');
      level = parseInt(_lib.data(el, 'nblockLevel')) || 5;
      blocks.push([level, auto, el]);
    }
    blocks = blocks.sort(function(block1, block2){
      return block1[0] - block2[0];
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
  var _n, _lib;
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib;
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
      if (service && _lib.isFunction(service.init)) {
        return service.init(_n);
      } else {
        return service;
      }
    }
  };
  _n.trigger('STATUS:NSERVICE_DEFINE');
  /* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
}).call(this);
