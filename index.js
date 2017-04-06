(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object') {
		var $, Backbone;
		try {$ = require('jQuery');}
		catch(e) {}
		if (!$)
			try { $ = require('Zepto'); }
			catch(e) {}
		try { Backbone = require('Backbone'); }
		catch(e) {};
		module.exports = factory(require("underscore"), $, $, Backbone);
	} else if(typeof define === 'function' && define.amd)
		define(["_", "jQuery", "Zepto", "Backbone"], factory);
	else if(typeof exports === 'object')
		exports["ndoojs"] = factory(require("_"), require("jQuery"), require("Zepto"), require("Backbone"));
	else
		root["ndoojs"] = factory(root["_"], root["jQuery"], root["Zepto"], root["Backbone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ndoo_1 = __webpack_require__(2);
	var ndoo = new ndoo_1.Ndoo();
	var RegType = ndoo.RegType, Component = ndoo.Component;
	exports.RegType = RegType;
	exports.Component = Component;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ndoo;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var prep_1 = __webpack_require__(3);
	var storage_1 = __webpack_require__(7);
	var router_1 = __webpack_require__(8);
	var lib_1 = __webpack_require__(9);
	var prepData_1 = __webpack_require__(6);
	var component_1 = __webpack_require__(16);
	var prepData = prepData_1.getPrepData();
	var Ndoo = (function (_super) {
	    __extends(Ndoo, _super);
	    function Ndoo() {
	        _super.call(this);
	        this._lib = lib_1._lib;
	        this.pageId = '';
	        this._pk = +new Date();
	        this.storage = storage_1.Storage;
	        this.router = router_1.Router;
	        this._loader = {
	            app: 'do',
	            block: 'do',
	            init: 'do',
	            appLoader: null,
	            blockLoader: null,
	            initLoader: null,
	            doLoader: function (depend, callback) {
	                Do.apply(null, depend.concat(callback));
	            },
	            seajsLoader: function (depend, callback) {
	                seajs.use(depend, callback);
	            }
	        };
	        this._blockData = {
	            _block: {},
	            _app: {},
	            _service: {},
	            _exist: {}
	        };
	        this.RegType = component_1.RegType;
	        this.Component = component_1.getComponent(this);
	        this.storage._lib = this._lib;
	        this._rebuildEvent();
	        this.event.init();
	        this.trigger('STATUS:NAPP_DEFINE');
	        this.trigger('STATUS:NBLOCK_DEFINE');
	        this.trigger('STATUS:NSERVICE_DEFINE');
	        this._bindBlockEvent();
	        if (prepData) {
	            prepData_1.removePrepData();
	        }
	    }
	    Ndoo.prototype.initPageId = function (id) {
	        if (this.pageId) {
	            return;
	        }
	        if (typeof document != 'undefined') {
	            var el = document.getElementById(id || 'scriptArea');
	            if (el) {
	                this.pageId = el.getAttribute('data-page-id') || '';
	            }
	            if (!this.pageId && id) {
	                this.pageId = id;
	            }
	        }
	    };
	    Ndoo.prototype.getPk = function (prefix) {
	        if (prefix === void 0) { prefix = ''; }
	        return "" + prefix + ++this._pk;
	    };
	    Ndoo.prototype.setLoader = function (type, loader) {
	        this._loader[type] = type + "Loader";
	        this._loader[(type + "Loader")] = loader;
	    };
	    Ndoo.prototype.require = function (depend, callback, type) {
	        type = type.toLowerCase();
	        if (this._loader[(type + "Loader")]) {
	            this[type](depend, callback);
	        }
	        else {
	            throw new Error('require load is not define');
	        }
	    };
	    Ndoo.prototype._block = function (base, ns, name, block) {
	        var data;
	        var nsArr;
	        if (base == 'block' || base == 'app' || base == 'service') {
	            data = this._blockData[("_" + base)];
	        }
	        else {
	            return false;
	        }
	        if (ns) {
	            nsArr = ns.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
	        }
	        else {
	            nsArr = [];
	        }
	        var temp = data;
	        var result;
	        var success;
	        if (block || arguments.length > 3) {
	            for (var _i = 0, nsArr_1 = nsArr; _i < nsArr_1.length; _i++) {
	                var ns_1 = nsArr_1[_i];
	                temp = temp[ns_1] || (temp[ns_1] = {});
	            }
	            if (block && (base === 'app' || base === 'block')) {
	                if (typeof block === 'object') {
	                    if (base === 'app' && temp[name]) {
	                        result = this._lib.defaults(temp[name], block);
	                    }
	                    else {
	                        result = temp[name] = block;
	                    }
	                }
	                else if (typeof block === 'function') {
	                    result = temp[name] = block;
	                }
	                else {
	                    result = false;
	                }
	            }
	            else if (base == 'service') {
	                result = temp[name] = block;
	                success = true;
	            }
	            else {
	                result = false;
	            }
	            if (result || success) {
	                if (ns) {
	                    this._blockData._exist[(base + "." + ns + "." + name)] = true;
	                }
	                else {
	                    this._blockData._exist[(base + "." + name)] = true;
	                }
	            }
	            return result;
	        }
	        else {
	            for (var _a = 0, nsArr_2 = nsArr; _a < nsArr_2.length; _a++) {
	                var ns_2 = nsArr_2[_a];
	                if (!this._lib.has(temp, ns_2)) {
	                    return undefined;
	                }
	                temp = temp[ns_2];
	            }
	            return temp[name];
	        }
	    };
	    Ndoo.prototype.hasApp = function (ns) {
	        return this._blockData._exist[("app." + ns)];
	    };
	    Ndoo.prototype.setApp = function (ns) {
	        return this._blockData._exist[("app." + ns)] = true;
	    };
	    Ndoo.prototype.app = function (ns, app) {
	        var nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
	        var appName;
	        if (!nsmatch) {
	            nsmatch = [, null, ns];
	        }
	        ns = nsmatch[1], appName = nsmatch[2];
	        if (arguments.length > 1) {
	            return this._block('app', ns, appName, app);
	        }
	        else {
	            return this._block('app', ns, appName);
	        }
	    };
	    Ndoo.prototype._blockExist = function (ns, set) {
	        if (set === void 0) { set = false; }
	        var nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
	        var name;
	        if (!nsmatch) {
	            nsmatch = [, '_default', ns];
	        }
	        ns = nsmatch[1], name = nsmatch[2];
	        if (set) {
	            return this._blockData._exist[("block." + ns + "." + name)] = true;
	        }
	        else {
	            return this._blockData._exist[("block." + ns + "." + name)];
	        }
	    };
	    Ndoo.prototype.hasBlock = function (ns) {
	        return this._blockExist(ns);
	    };
	    Ndoo.prototype.setBlock = function (ns) {
	        return this._blockExist(ns, true);
	    };
	    Ndoo.prototype.block = function (ns, block) {
	        var nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
	        var name;
	        if (!nsmatch) {
	            nsmatch = [, 'default', ns];
	        }
	        ns = nsmatch[0], name = nsmatch[1];
	        if (arguments.length > 1) {
	            return this._block('block', ns, name, block);
	        }
	        else {
	            return this._block('block', ns, name);
	        }
	    };
	    Ndoo.prototype.initBlock = function (elem) {
	        var _this = this;
	        var _a = this, _lib = _a._lib, router = _a.router;
	        var blockId = _lib.data(elem, 'nblockId');
	        blockId = blockId.split(/\s*,\s*|\s+/);
	        var _call = function (blockId) {
	            router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/, blockId, function (ns, blockName, params) {
	                ns = ns.replace(/\//g, '.');
	                var pkg = ns + "." + blockName;
	                if (_this.block(pkg)) {
	                    _this.trigger('NBLOCK_LOADED', elem, ns, blockName, params);
	                }
	                else if (_this.hasBlock(pkg)) {
	                    _this.require([(ns + "." + blockName)], function () {
	                        _this.trigger('NBLOCK_LOADED', elem, ns, blockName, params);
	                    }, _this._loader['block']);
	                }
	            });
	        };
	        _lib.each(blockId, function (id) {
	            var _self = _this;
	            _call.call(_self, id);
	        });
	    };
	    Ndoo.prototype._bindBlockEvent = function () {
	        var _this = this;
	        this.on('NBLOCK_LOADED', function (elem, ns, name, params) {
	            ns == null && (ns = '_default');
	            var block = _this.block(ns + "." + name);
	            if (block) {
	                if (_this._lib.isFunction(block.init)) {
	                    var call = function () {
	                        block.init(elem, params);
	                    };
	                    if (block.depend) {
	                        _this.require([].concat(block.depend), call, _this._loader['block']);
	                    }
	                    else {
	                        call();
	                    }
	                }
	                else if (_this._lib.isFunction(block)) {
	                    block(elem, params);
	                }
	            }
	        });
	        this.on('NBLOCK_INIT', function () {
	            var blockEl = _this._lib.querySelector('[data-nblock-id]');
	            if (!blockEl || !blockEl.length) {
	                return;
	            }
	            var blocks = [];
	            for (var _i = 0, blockEl_1 = blockEl; _i < blockEl_1.length; _i++) {
	                var el = blockEl_1[_i];
	                var auto = _this._lib.data(el, 'nblockAuto');
	                var level = parseInt(_this._lib.data(el, 'nblockLevel')) || 5;
	                blocks.push([level, auto, el]);
	            }
	            blocks = blocks.sort(function (block1, block2) { return block1[0] - block2[0]; });
	            for (var _a = 0, blocks_1 = blocks; _a < blocks_1.length; _a++) {
	                var item = blocks_1[_a];
	                var auto = item[1], block = item[2];
	                if (auto === undefined || auto.toString() != 'false') {
	                    _this.initBlock(block);
	                }
	            }
	        });
	    };
	    Ndoo.prototype.service = function (ns, service) {
	        var nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
	        var name;
	        if (!nsmatch) {
	            nsmatch = [, '_default', ns];
	        }
	        ns = nsmatch[1], name = nsmatch[2];
	        if (arguments.length > 1) {
	            return this._block('service', ns, name, service);
	        }
	        else {
	            service = this._block('service', ns, name);
	            if (service && this._lib.isFunction(service.init)) {
	                return service.init();
	            }
	            else {
	                return service;
	            }
	        }
	    };
	    Ndoo.prototype.dispatch = function () {
	        var _this = this;
	        var _lib = this._lib;
	        var filterHaldner = function (type, controller, actionName, params) {
	            var data;
	            var _lib = _this._lib;
	            if (type === 'before') {
	                data = controller.before;
	            }
	            else if (type === 'after') {
	                data = controller.after;
	            }
	            if (!data) {
	                return;
	            }
	            var _data;
	            if (typeof data === 'object') {
	                _data = [].concat(data);
	            }
	            for (var _i = 0, _data_1 = _data; _i < _data_1.length; _i++) {
	                var dataItem = _data_1[_i];
	                var _filter = dataItem.filter;
	                if (!_lib.isArray(_filter)) {
	                    _filter = [].concat(_filter.split(/\s*,\s*|\s+/));
	                }
	                var isRun = true;
	                if (dataItem.only) {
	                    var _only = dataItem.only;
	                    if (!_lib.isArray(_only)) {
	                        _only = [].concat(_only.split(/\s*,\s*|\s+/));
	                    }
	                    if (_lib.indexOf(_only, actionName) < 0) {
	                        isRun = false;
	                    }
	                }
	                else if (dataItem.except) {
	                    var _except = dataItem.except;
	                    if (!_lib.isArray(_except)) {
	                        _except = [].concat(_except.split(/\s*,\s*|\s+/));
	                    }
	                    if (_lib.indexOf(_except, actionName) > -1) {
	                        isRun = false;
	                    }
	                }
	                if (isRun) {
	                    for (var _a = 0, _filter_1 = _filter; _a < _filter_1.length; _a++) {
	                        var filter = _filter_1[_a];
	                        controller[(filter + "Filter")](actionName, params);
	                    }
	                }
	            }
	        };
	        this.on('NAPP_ACTION_BEFORE', function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i - 0] = arguments[_i];
	            }
	            return filterHaldner.apply(null, ['before'].concat(data));
	        });
	        this.on('NAPP_ACTION_AFTER', function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i - 0] = arguments[_i];
	            }
	            return filterHaldner.apply(null, ['after'].concat(data));
	        });
	        this.on('NAPP_LOADED', function (ns, appName, actionName, params) {
	            var appData;
	            var _self = _this;
	            if (ns) {
	                appData = _this.app(ns + "." + appName);
	            }
	            else {
	                appData = _this.app(appName);
	            }
	            if (!_lib.has(appData, actionName + "Action")
	                && _lib.has(appData, 'emptyAction')) {
	                actionName = '_empty';
	            }
	            var depend = [];
	            if (appData['depend']) {
	                depend = depend.concat(appData['depend']);
	            }
	            if (appData[(actionName + "Depend")]) {
	                depend = depend.concat(appData[(actionName + "Depend")]);
	            }
	            var filterPrefix = appName;
	            if (ns) {
	                filterPrefix = (ns + "." + appName).replace(/\./g, '_');
	            }
	            filterPrefix = filterPrefix.toUpperCase();
	            var run = function () {
	                var args = [].slice.call(arguments, 0);
	                args.unshift(params);
	                if (actionName) {
	                    _self.trigger('NAPP_ACTION_BEFORE', appData, actionName, params);
	                    _self.trigger("NAPP_" + filterPrefix + "_ACTION_BEFORE", appData, actionName, params);
	                    if (appData[(actionName + "Before")]) {
	                        appData[(actionName + "Before")].apply(appData, args);
	                    }
	                    if (appData[(actionName + "Action")]) {
	                        appData[(actionName + "Action")].apply(appData, args);
	                    }
	                    if (appData[(actionName + "After")]) {
	                        appData[(actionName + "After")].apply(appData, args);
	                    }
	                    _self.trigger("NAPP_" + filterPrefix + "_ACTION_AFTER", appData, actionName, params);
	                    _self.trigger('NAPP_ACTION_AFTER', appData, actionName, params);
	                }
	                _self.trigger('STATUS:NBLOCK_INIT');
	            };
	            if (depend.length) {
	                _this.require(_lib.uniq(depend), run, _this._loader['app']);
	            }
	            else {
	                run();
	            }
	        });
	        this.on('PAGE_STATUS_ROUTING', function (data) {
	            _this.router.parse(/^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/, data, function (appName, actionName, params) {
	                var nsmatch = appName.match(/(.*?)(?:[/.]([^/.]+))$/);
	                var ns = '';
	                if (nsmatch) {
	                    ns = nsmatch[1], appName = nsmatch[2];
	                }
	                var pkg;
	                if (ns) {
	                    ns = ns.replace(/\//g, '.');
	                    pkg = ns + "." + appName;
	                }
	                else {
	                    pkg = appName;
	                }
	                if (_this.app(pkg)) {
	                    _this.trigger('NAPP_LOADED', ns, appName, actionName, params);
	                }
	                else if (_this.hasApp(pkg)) {
	                    _this.require([pkg], function () {
	                        this.trigger('NAPP_LOADED', ns, appName, actionName, params);
	                    }, _this._loader['app']);
	                }
	                else {
	                    _this.trigger('STATUS:NBLOCK_INIT');
	                }
	            });
	        });
	    };
	    Ndoo.prototype.triggerPageStatus = function (depend) {
	        var _this = this;
	        var _lib = this._lib;
	        var call = function () {
	            _this.trigger('STATUS:PAGE_STATUS_FAST');
	            _lib.onready(function () {
	                _this.trigger('STATUS:PAGE_STATUS_DOMPREP');
	                _this.trigger('STATUS:PAGE_STATUS_DOM');
	                _this.trigger('STATUS:PAGE_STATUS_DOMORLOAD');
	            });
	            _lib.onload(function () {
	                _this.trigger('STATUS:PAGE_STATUS_LOAD');
	            });
	            _this.on('PAGE_STATUS_DOM', function () {
	                if (_this.pageId) {
	                    _this.trigger('STATUS:PAGE_STATUS_ROUTING', _this.pageId);
	                }
	            });
	        };
	        depend ? this.require([].concat(depend), call, this._loader['init']) : call();
	    };
	    Ndoo.prototype.init = function (id, depend) {
	        var _lib = this._lib;
	        if (_lib.isArray(id)) {
	            _a = ['', id], id = _a[0], depend = _a[1];
	        }
	        this.initPageId(id);
	        this.dispatch();
	        this.triggerPageStatus(depend);
	        return this;
	        var _a;
	    };
	    Ndoo.prototype._rebuildEvent = function () {
	        var _lib = this._lib;
	        var eventHandle = _lib.extend({
	            events: {},
	            listened: {}
	        }, _lib.Events);
	        this.event = _lib.extend(this.event, {
	            eventHandle: eventHandle,
	            on: function (eventName, callback) {
	                var eventHandle = this.eventHandle;
	                eventHandle.on(eventName, callback);
	                eventHandle.listened[eventName] = true;
	                if (_lib.has(eventHandle.events, "STATUS:" + eventName)) {
	                    callback.apply(eventHandle, eventHandle.events[("STATUS:" + eventName)]);
	                }
	                if (_lib.has(eventHandle.events, eventName)) {
	                    for (var _i = 0, _a = eventHandle.events[eventName]; _i < _a.length; _i++) {
	                        var item = _a[_i];
	                        callback.apply(eventHandle, item);
	                    }
	                }
	            },
	            trigger: function (eventName, eventType, data) {
	                var eventHandle = this.eventHandle;
	                if (eventType === 'DEFAULT') {
	                    eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
	                }
	                else if (eventType === 'DELAY') {
	                    if (_lib.has(eventHandle.listened, eventName)) {
	                        eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
	                    }
	                    if (!_lib.has(eventHandle.events, eventName)) {
	                        eventHandle.events[eventName] = [];
	                    }
	                    eventHandle.events[eventName].push(data);
	                }
	                else if (eventType === 'STATUS') {
	                    if (!_lib.has(eventHandle.events, eventType + ":" + eventName)) {
	                        eventHandle.events[(eventType + ":" + eventName)] = data;
	                        if (_lib.has(eventHandle.listened, eventName)) {
	                            eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
	                        }
	                    }
	                }
	            },
	            off: function (eventName) {
	                var eventHandle = this.eventHandle;
	                eventHandle.off(eventName);
	                delete eventHandle.listened[eventName];
	                delete eventHandle.events[eventName];
	            },
	            init: function () {
	                var _a = this, inited = _a.inited, _temp = _a._temp, TYPE_ON = _a.TYPE_ON, TYPE_TRIGGER = _a.TYPE_TRIGGER;
	                if (!inited && _temp.length) {
	                    for (var _i = 0, _temp_1 = _temp; _i < _temp_1.length; _i++) {
	                        var item = _temp_1[_i];
	                        if (item.type === TYPE_ON) {
	                            this.on(item.eventName, item.callback);
	                        }
	                        else if (item.type === TYPE_TRIGGER) {
	                            this.trigger(item.eventName, item.eventTYpe, item.data);
	                        }
	                    }
	                    inited = true;
	                }
	            }
	        });
	    };
	    return Ndoo;
	}(prep_1.Prep));
	exports.Ndoo = Ndoo;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var api_1 = __webpack_require__(4);
	var basic_1 = __webpack_require__(5);
	var prepData_1 = __webpack_require__(6);
	var prepData = prepData_1.getPrepData();
	var Prep = (function (_super) {
	    __extends(Prep, _super);
	    function Prep() {
	        _super.call(this);
	        this._isDebug = false;
	        this.event = basic_1.EventBasic;
	        this.vars = {};
	        this.func = {};
	        this._lib = {};
	        if (prepData) {
	            this.vars = prepData.vars;
	            this.func = prepData.func;
	        }
	    }
	    return Prep;
	}(api_1.EventApi));
	exports.Prep = Prep;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var EventApi = (function () {
	    function EventApi() {
	    }
	    EventApi.prototype.on = function (eventName, callback) {
	        eventName = eventName.split(/\s*,\s*|\s+/);
	        for (var _i = 0, _a = eventName; _i < _a.length; _i++) {
	            var e = _a[_i];
	            this.event.on(e, callback);
	        }
	    };
	    EventApi.prototype.trigger = function (eventName) {
	        var data = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            data[_i - 1] = arguments[_i];
	        }
	        var _index = eventName.indexOf(':');
	        var type = eventName.substring(0, _index++) || 'DEFAULT';
	        var e = eventName.substring(_index);
	        this.event.trigger(e, type, data);
	    };
	    EventApi.prototype.off = function (eventName) {
	        eventName = eventName.split(/\s*,\s*|\s+/);
	        for (var _i = 0, _a = eventName; _i < _a.length; _i++) {
	            var e = _a[_i];
	            this.event.off(e);
	        }
	    };
	    return EventApi;
	}());
	exports.EventApi = EventApi;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var prepData_1 = __webpack_require__(6);
	var prepData = prepData_1.getPrepData();
	var EventBasic = (function () {
	    function EventBasic(name, type) {
	        return "#" + name + ":#" + type;
	    }
	    EventBasic.on = function (eventName, callback) {
	        this._temp.push({
	            type: this.TYPE_ON,
	            eventName: eventName, callback: callback
	        });
	    };
	    EventBasic.trigger = function (eventName, eventType, data) {
	        this._temp.push({
	            type: this.TYPE_TRIGGER,
	            eventName: eventName, eventType: eventType, data: data
	        });
	    };
	    EventBasic.off = function (eventName) { };
	    EventBasic.init = function () { };
	    EventBasic.TYPE_ON = 1;
	    EventBasic.TYPE_TRIGGER = 2;
	    EventBasic.inited = false;
	    EventBasic._temp = prepData ? prepData.eventData : [];
	    return EventBasic;
	}());
	exports.EventBasic = EventBasic;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	exports.getPrepData = function () {
	    if (typeof window != 'undefined' && window['ndoo_prep_data']) {
	        return window['ndoo_prep_data'];
	    }
	    return false;
	};
	exports.setPrepData = function () {
	    var _self = {};
	    if (typeof window != 'undefined') {
	        _self = window;
	    }
	    if (!_self.ndoo_prep_data) {
	        _self.ndoo_prep_data = {
	            eventData: [],
	            func: {},
	            vars: {}
	        };
	    }
	};
	exports.removePrepData = function () {
	    if (typeof window != 'undefined' && window['ndoo_prep_data']) {
	        delete window['ndoo_prep_data'];
	    }
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var Storage = (function () {
	    function Storage(key, value, option) {
	        var _self = Storage;
	        var destroy = option & _self.DESTROY;
	        var rewrite = option & _self.REWRITE;
	        var data = _self._data;
	        if (value === undefined) {
	            return data[key];
	        }
	        if (destroy) {
	            delete data[key];
	            return true;
	        }
	        if (!rewrite && _self._lib.has(data, key)) {
	            return false;
	        }
	        return data[key] = value;
	    }
	    Storage._data = {};
	    Storage.REWRITE = 1;
	    Storage.DESTROY = 2;
	    return Storage;
	}());
	exports.Storage = Storage;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var Router = (function () {
	    function Router() {
	    }
	    Router.parse = function (route, url, callback) {
	        var routeMatch = route.exec(url);
	        if (routeMatch != null) {
	            callback.apply(null, routeMatch.slice(1));
	        }
	    };
	    return Router;
	}());
	exports.Router = Router;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(10);
	var depend = __webpack_require__(11);
	var event_1 = __webpack_require__(14);
	exports._lib = _.extend({ Events: event_1.Events }, depend, _);


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var jquery = __webpack_require__(12);
	var zepto = __webpack_require__(13);
	var $ = jquery || zepto;
	var depend = {};
	if ($) {
	    depend.onready = function (callback) {
	        $(callback);
	    };
	    depend.onload = function (callback) {
	        $(window).on('load', callback);
	    };
	    depend.querySelector = function (selector) {
	        $(selector).slice(0);
	    };
	    depend.data = function (elem, key, value) {
	        if (arguments.length === 2) {
	            return $(elem).data(key);
	        }
	        else if (arguments.length === 3) {
	            return $(elem).data(key, value);
	        }
	    };
	}
	else {
	    depend.onready = function (callback) {
	        document.addEventListener('DOMContentLoaded', callback, false);
	    };
	    depend.onload = function (callback) {
	        addEventListener('load', callback, false);
	    };
	    depend.querySelector = function (selector) {
	        document.querySelectorAll(selector);
	    };
	    depend.data = function (elem, key, value) {
	        if (!elem.dataset) {
	            key = key.replace(/([A-Z])/g, function (char) { return '-' + char.toLocaleLowerCase(); });
	        }
	        if (arguments.length === 2) {
	            if (elem.dataset) {
	                return elem.dataset[key];
	            }
	            else {
	                return elem.getAttribute(key);
	            }
	        }
	        else if (arguments.length === 3) {
	            if (elem.dataset) {
	                elem.dataset[key] = value;
	            }
	            else {
	                elem.setAttribute(key, value);
	            }
	        }
	    };
	}
	exports.onready = depend.onready, exports.onload = depend.onload, exports.querySelector = depend.querySelector, exports.data = depend.data;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(10);
	var Backbone = __webpack_require__(15);
	var Events = {};
	exports.Events = Events;
	if (Backbone) {
	    exports.Events = Events = Backbone.Events;
	}
	else {
	    var eventSplitter = /\s+/;
	    var eventsApi = function (iteratee, events, name, callback, opts) {
	        var i = 0, names;
	        if (name && typeof name === 'object') {
	            if (callback !== void 0 && 'context' in opts && opts.context === void 0)
	                opts.context = callback;
	            for (names = _.keys(name); i < names.length; i++) {
	                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	            }
	        }
	        else if (name && eventSplitter.test(name)) {
	            for (names = name.split(eventSplitter); i < names.length; i++) {
	                events = iteratee(events, names[i], callback, opts);
	            }
	        }
	        else {
	            events = iteratee(events, name, callback, opts);
	        }
	        return events;
	    };
	    Events.on = function (name, callback, context) {
	        return internalOn(this, name, callback, context);
	    };
	    var internalOn = function (obj, name, callback, context, listening) {
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
	    Events.listenTo = function (obj, name, callback) {
	        if (!obj)
	            return this;
	        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	        var listeningTo = this._listeningTo || (this._listeningTo = {});
	        var listening = listeningTo[id];
	        if (!listening) {
	            var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	            listening = listeningTo[id] = { obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0 };
	        }
	        internalOn(obj, name, callback, this, listening);
	        return this;
	    };
	    var onApi = function (events, name, callback, options) {
	        if (callback) {
	            var handlers = events[name] || (events[name] = []);
	            var context = options.context, ctx = options.ctx, listening = options.listening;
	            if (listening)
	                listening.count++;
	            handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
	        }
	        return events;
	    };
	    Events.off = function (name, callback, context) {
	        if (!this._events)
	            return this;
	        this._events = eventsApi(offApi, this._events, name, callback, {
	            context: context,
	            listeners: this._listeners
	        });
	        return this;
	    };
	    Events.stopListening = function (obj, name, callback) {
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var ids = obj ? [obj._listenId] : _.keys(listeningTo);
	        for (var i = 0; i < ids.length; i++) {
	            var listening = listeningTo[ids[i]];
	            if (!listening)
	                break;
	            listening.obj.off(name, callback, this);
	        }
	        if (_.isEmpty(listeningTo))
	            this._listeningTo = void 0;
	        return this;
	    };
	    var offApi = function (events, name, callback, options) {
	        if (!events)
	            return;
	        var i = 0, listening;
	        var context = options.context, listeners = options.listeners;
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
	            if (!handlers)
	                break;
	            var remaining = [];
	            for (var j = 0; j < handlers.length; j++) {
	                var handler = handlers[j];
	                if (callback && callback !== handler.callback &&
	                    callback !== handler.callback._callback ||
	                    context && context !== handler.context) {
	                    remaining.push(handler);
	                }
	                else {
	                    listening = handler.listening;
	                    if (listening && --listening.count === 0) {
	                        delete listeners[listening.id];
	                        delete listening.listeningTo[listening.objId];
	                    }
	                }
	            }
	            if (remaining.length) {
	                events[name] = remaining;
	            }
	            else {
	                delete events[name];
	            }
	        }
	        if (_.size(events))
	            return events;
	    };
	    Events.once = function (name, callback, context) {
	        var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	        return this.on(events, void 0, context);
	    };
	    Events.listenToOnce = function (obj, name, callback) {
	        var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	        return this.listenTo(obj, events);
	    };
	    var onceMap = function (map, name, callback, offer) {
	        if (callback) {
	            var once = map[name] = _.once(function () {
	                offer(name, once);
	                callback.apply(this, arguments);
	            });
	            once._callback = callback;
	        }
	        return map;
	    };
	    Events.trigger = function (name) {
	        if (!this._events)
	            return this;
	        var length = Math.max(0, arguments.length - 1);
	        var args = Array(length);
	        for (var i = 0; i < length; i++)
	            args[i] = arguments[i + 1];
	        eventsApi(triggerApi, this._events, name, void 0, args);
	        return this;
	    };
	    var triggerApi = function (objEvents, name, cb, args) {
	        if (objEvents) {
	            var events = objEvents[name];
	            var allEvents = objEvents.all;
	            if (events && allEvents)
	                allEvents = allEvents.slice();
	            if (events)
	                triggerEvents(events, args);
	            if (allEvents)
	                triggerEvents(allEvents, [name].concat(args));
	        }
	        return objEvents;
	    };
	    var triggerEvents = function (events, args) {
	        var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	        switch (args.length) {
	            case 0:
	                while (++i < l)
	                    (ev = events[i]).callback.call(ev.ctx);
	                return;
	            case 1:
	                while (++i < l)
	                    (ev = events[i]).callback.call(ev.ctx, a1);
	                return;
	            case 2:
	                while (++i < l)
	                    (ev = events[i]).callback.call(ev.ctx, a1, a2);
	                return;
	            case 3:
	                while (++i < l)
	                    (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
	                return;
	            default:
	                while (++i < l)
	                    (ev = events[i]).callback.apply(ev.ctx, args);
	                return;
	        }
	    };
	    Events.bind = Events.on;
	    Events.unbind = Events.off;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	(function (RegType) {
	    RegType[RegType["App"] = 0] = "App";
	    RegType[RegType["Block"] = 1] = "Block";
	    RegType[RegType["Service"] = 2] = "Service";
	})(exports.RegType || (exports.RegType = {}));
	var RegType = exports.RegType;
	exports.getComponent = function (ndoo) {
	    return function (path, type, isStatic) {
	        if (isStatic === void 0) { isStatic = false; }
	        return function (component) {
	            var instance = component;
	            if (!isStatic) {
	                instance = new component();
	            }
	            var method = '';
	            switch (type) {
	                case RegType.App:
	                    method = 'app';
	                    break;
	                case RegType.Block:
	                    method = 'block';
	                    break;
	                case RegType.Service:
	                    method = 'service';
	                    break;
	            }
	            method && ndoo[method](path, instance);
	        };
	    };
	};


/***/ }
/******/ ])
});
;