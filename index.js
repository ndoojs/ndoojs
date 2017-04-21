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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	module.exports = ndoo;


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
	var prepData = prepData_1.getPrepData();
	var Ndoo = (function (_super) {
	    __extends(Ndoo, _super);
	    function Ndoo() {
	        var _this = _super.call(this) || this;
	        _this._lib = lib_1._lib;
	        /**
	         * page id
	         *
	         * @name pageId
	         * @memberof ndoo
	         * @type {string}
	         */
	        _this.pageId = '';
	        /**
	         * 内部_pk主键
	         *
	         * @private
	         * @name _pk
	         * @memberof ndoo
	         */
	        _this._pk = +new Date();
	        _this.storage = storage_1.Storage;
	        _this.router = router_1.Router;
	        _this._loader = {
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
	        _this._blockData = {
	            _block: {},
	            _app: {},
	            _service: {},
	            _exist: {}
	        };
	        _this.storage._lib = _this._lib;
	        _this._rebuildEvent();
	        _this.event.init();
	        _this.trigger('STATUS:NAPP_DEFINE');
	        _this.trigger('STATUS:NBLOCK_DEFINE');
	        _this.trigger('STATUS:NSERVICE_DEFINE');
	        _this._bindBlockEvent();
	        if (prepData) {
	            prepData_1.removePrepData();
	        }
	        return _this;
	    }
	    /**
	     * initPageId 初始化 pageId
	     *
	     * @private
	     * @name initPageId
	     * @memberof ndoo
	     */
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
	    /**
	     * 获取唯一key
	     *
	     * @method
	     * @name getPk
	     * @memberof ndoo
	     * @param prefix {string} 前缀
	     * @return {string} 键名
	     */
	    Ndoo.prototype.getPk = function (prefix) {
	        if (prefix === void 0) { prefix = ''; }
	        return "" + prefix + ++this._pk;
	    };
	    /**
	     * 设置加载器
	     *
	     * @method
	     * @name setLoader
	     * @memberof ndoo
	     * @param type {string} 加载器类型
	     * @param loader {Function} 加载器回调函数
	     */
	    Ndoo.prototype.setLoader = function (type, loader) {
	        this._loader[type] = type + "Loader";
	        this._loader[type + "Loader"] = loader;
	    };
	    /**
	     * 依赖加载方法
	     *
	     * @method
	     * @name require
	     * @memberof ndoo
	     * @param depend {array} 依赖
	     * @param callback {Function} 架设函数
	     * @param type {string} 加载器类型 app/block/service
	     */
	    Ndoo.prototype.require = function (depend, callback, type) {
	        type = type.toLowerCase();
	        if (this._loader[type + "Loader"]) {
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
	            data = this._blockData["_" + base];
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
	            // app/block只允许真值
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
	                    this._blockData._exist[base + "." + ns + "." + name] = true;
	                }
	                else {
	                    this._blockData._exist[base + "." + name] = true;
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
	    /**
	     * 检测是否存在指定app
	     *
	     * @method
	     * @name hasApp
	     * @memberof ndoo
	     * @param {string} namespace 名称空间
	     * @return {boolean} 是否在存指定的app
	     */
	    Ndoo.prototype.hasApp = function (ns) {
	        return this._blockData._exist["app." + ns];
	    };
	    /**
	     * 标识指定app已存在
	     *
	     * @method
	     * @name setApp
	     * @memberof ndoo
	     * @param {string} namespace 名称空间
	     */
	    Ndoo.prototype.setApp = function (ns) {
	        return this._blockData._exist["app." + ns] = true;
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
	    /**
	     * 检测是否存在指定block
	     *
	     * @private
	     * @param {string} ns 名称空间
	     * @param {set} boolean 是否标记block已存在
	     * @return {boolean} 返加block标记
	     */
	    Ndoo.prototype._blockExist = function (ns, set) {
	        if (set === void 0) { set = false; }
	        var nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
	        var name;
	        if (!nsmatch) {
	            nsmatch = [, '_default', ns];
	        }
	        ns = nsmatch[1], name = nsmatch[2];
	        if (set) {
	            return this._blockData._exist["block." + ns + "." + name] = true;
	        }
	        else {
	            return this._blockData._exist["block." + ns + "." + name];
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
	    Ndoo.prototype.hasBlock = function (ns) {
	        return this._blockExist(ns);
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
	    Ndoo.prototype.setBlock = function (ns) {
	        return this._blockExist(ns, true);
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
	    /**
	     * 初始化模块
	     *
	     * @method
	     * @name initBlock
	     * @memberof ndoo
	     * @param {DOMElement} elem 初始化的元素
	     */
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
	                    _this.require([ns + "." + blockName], function () {
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
	    /**
	     * 路由函数
	     *
	     * @private
	     * @method
	     * @name dispatch
	     * @memberof ndoo
	     */
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
	                        controller[filter + "Filter"](actionName, params);
	                    }
	                }
	            }
	        };
	        this.on('NAPP_ACTION_BEFORE', function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i] = arguments[_i];
	            }
	            return filterHaldner.apply(null, ['before'].concat(data));
	        });
	        this.on('NAPP_ACTION_AFTER', function () {
	            var data = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                data[_i] = arguments[_i];
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
	            if (appData[actionName + "Depend"]) {
	                depend = depend.concat(appData[actionName + "Depend"]);
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
	                    if (appData[actionName + "Before"]) {
	                        appData[actionName + "Before"].apply(appData, args);
	                    }
	                    if (appData[actionName + "Action"]) {
	                        appData[actionName + "Action"].apply(appData, args);
	                    }
	                    if (appData[actionName + "After"]) {
	                        appData[actionName + "After"].apply(appData, args);
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
	    /**
	     * 触发页面状态
	     *
	     * @private
	     * @method
	     * @name triggerPageStatus
	     * @memberof ndoo
	     * @param depend {string|array} 赖数组
	     */
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
	     */
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
	                    callback.apply(eventHandle, eventHandle.events["STATUS:" + eventName]);
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
	                        eventHandle.events[eventType + ":" + eventName] = data;
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
	/**
	 * ndoojs 全局名称空间，短名称N
	 *
	 * @namespace ndoo
	 */
	var Prep = (function (_super) {
	    __extends(Prep, _super);
	    function Prep() {
	        var _this = _super.call(this) || this;
	        _this.event = basic_1.EventBasic;
	        /**
	         * 变量存储名称空间
	         *
	         * @namespace
	         * @name vars
	         * @alias _vars
	         * @memberof ndoo
	         * @type {object}
	         * @example // alias _vars
	         * var _vars = ndoo.vars;
	         * vars.bar = 'bar';
	         */
	        _this.vars = {};
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
	        _this.func = {};
	        /**
	         * 依赖库存储空间
	         */
	        _this._lib = {};
	        if (prepData) {
	            _this.vars = prepData.vars;
	            _this.func = prepData.func;
	        }
	        return _this;
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
	    EventApi.prototype.on = function (eventName, callback) {
	        eventName = eventName.split(/\s*,\s*|\s+/);
	        for (var _i = 0, _a = eventName; _i < _a.length; _i++) {
	            var e = _a[_i];
	            this.event.on(e, callback);
	        }
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
	    /**
	     * global off
	     *
	     * @method
	     * @name off
	     * @memberof ndoo
	     * @param {string} eventName 事件名称
	     */
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
	/**
	 * 事件模块
	 *
	 * @namespace
	 * @name event
	 * @memberof ndoo
	 * @param {string} name 事件名称
	 * @param {string} type 事件类型
	 */
	var EventBasic = (function () {
	    function EventBasic(name, type) {
	        return "#" + name + ":#" + type;
	    }
	    /**
	     * on api
	     *
	     * @method
	     * @name on
	     * @memberof ndoo.event
	     * @param {string} eventName 事件名称
	     * @param {function} callback 回调函数
	     */
	    EventBasic.on = function (eventName, callback) {
	        this._temp.push({
	            type: this.TYPE_ON,
	            eventName: eventName, callback: callback
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
	    EventBasic.trigger = function (eventName, eventType, data) {
	        this._temp.push({
	            type: this.TYPE_TRIGGER,
	            eventName: eventName, eventType: eventType, data: data
	        });
	    };
	    /**
	     * off api
	     *
	     * @method
	     * @name off
	     * @memberof ndoo.event
	     * @param eventName {string}
	     */
	    EventBasic.off = function (eventName) { };
	    EventBasic.init = function () { };
	    return EventBasic;
	}());
	/**
	 * 暂存数据类型
	 *
	 * @name TYPE_ON
	 * @memberof ndoo.event
	 * @type {number}
	 */
	EventBasic.TYPE_ON = 1;
	/**
	 * 暂存数据类型
	 *
	 * @name TYPE_TRIGGER
	 * @memberof ndoo.event
	 * @type {number}
	 */
	EventBasic.TYPE_TRIGGER = 2;
	/**
	 * init token
	 *
	 * @name inited
	 * @memberof ndoo.event
	 * @type {boolean}
	 */
	EventBasic.inited = false;
	/**
	 * event stack
	 *
	 * @private
	 * @name _temp
	 * @memberof ndoo.event
	 * @type {array}
	 */
	EventBasic._temp = prepData ? prepData.eventData : [];
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
	    return Storage;
	}());
	Storage._data = {};
	/**
	 * storage重写常量
	 *
	 * @memberof ndoo.storage
	 */
	Storage.REWRITE = 1;
	/**
	 * storage删除常量
	 *
	 * @memberof ndoo.storage
	 */
	Storage.DESTROY = 2;
	exports.Storage = Storage;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * 内置路由通过正则配匹各部件
	 *
	 * @private
	 * @namespace
	 * @memberof ndoo
	 * @type {object}
	 */
	var Router = (function () {
	    function Router() {
	    }
	    /**
	     * 路由解析方法
	     *
	     * @private
	     * @method
	     * @memberof ndoo.router
	     * @param route {RegExp} 路由正则
	     * @param url {string url路径
	     * @param callback {Function} 回调函数
	     */
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
	/// <references src="../declare.d.ts" />
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
	    // var Events: any = {};
	    // Regular expression used to split event strings.
	    var eventSplitter = /\s+/;
	    // Iterates over the standard 'event, callback' (as well as the fancy multiple
	    // space-separated events '"change blur", callback' and jQuery-style event
	    // maps '{event: callback}').
	    var eventsApi = function (iteratee, events, name, callback, opts) {
	        var i = 0, names;
	        if (name && typeof name === 'object') {
	            // Handle event maps.
	            if (callback !== void 0 && 'context' in opts && opts.context === void 0)
	                opts.context = callback;
	            for (names = _.keys(name); i < names.length; i++) {
	                events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	            }
	        }
	        else if (name && eventSplitter.test(name)) {
	            // Handle space separated event names by delegating them individually.
	            for (names = name.split(eventSplitter); i < names.length; i++) {
	                events = iteratee(events, names[i], callback, opts);
	            }
	        }
	        else {
	            // Finally, standard events.
	            events = iteratee(events, name, callback, opts);
	        }
	        return events;
	    };
	    // Bind an event to a 'callback' function. Passing '"all"' will bind
	    // the callback to all events fired.
	    Events.on = function (name, callback, context) {
	        return internalOn(this, name, callback, context);
	    };
	    // Guard the 'listening' argument from the public API.
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
	    // Inversion-of-control versions of 'on'. Tell *this* object to listen to
	    // an event in another object... keeping track of what it's listening to
	    // for easier unbinding later.
	    Events.listenTo = function (obj, name, callback) {
	        if (!obj)
	            return this;
	        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	        var listeningTo = this._listeningTo || (this._listeningTo = {});
	        var listening = listeningTo[id];
	        // This object is not listening to any other events on 'obj' yet.
	        // Setup the necessary references to track the listening callbacks.
	        if (!listening) {
	            var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	            listening = listeningTo[id] = { obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0 };
	        }
	        // Bind callbacks on obj, and keep track of them on listening.
	        internalOn(obj, name, callback, this, listening);
	        return this;
	    };
	    // The reducing API that adds a callback to the 'events' object.
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
	    // Remove one or many callbacks. If 'context' is null, removes all
	    // callbacks with that function. If 'callback' is null, removes all
	    // callbacks for the event. If 'name' is null, removes all bound
	    // callbacks for all events.
	    Events.off = function (name, callback, context) {
	        if (!this._events)
	            return this;
	        this._events = eventsApi(offApi, this._events, name, callback, {
	            context: context,
	            listeners: this._listeners
	        });
	        return this;
	    };
	    // Tell this object to stop listening to either specific events ... or
	    // to every object it's currently listening to.
	    Events.stopListening = function (obj, name, callback) {
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var ids = obj ? [obj._listenId] : _.keys(listeningTo);
	        for (var i = 0; i < ids.length; i++) {
	            var listening = listeningTo[ids[i]];
	            // If listening doesn't exist, this object is not currently
	            // listening to obj. Break out early.
	            if (!listening)
	                break;
	            listening.obj.off(name, callback, this);
	        }
	        if (_.isEmpty(listeningTo))
	            this._listeningTo = void 0;
	        return this;
	    };
	    // The reducing API that removes a callback from the 'events' object.
	    var offApi = function (events, name, callback, options) {
	        if (!events)
	            return;
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
	            if (!handlers)
	                break;
	            // Replace events if there are any remaining.  Otherwise, clean up.
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
	            // Update tail event if the list has any events.  Otherwise, clean up.
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
	    // Bind an event to only be triggered a single time. After the first time
	    // the callback is invoked, its listener will be removed. If multiple events
	    // are passed in using the space-separated syntax, the handler will fire
	    // once for each event, not once for a combination of all events.
	    Events.once = function (name, callback, context) {
	        // Map the event into a '{event: once}' object.
	        var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	        return this.on(events, void 0, context);
	    };
	    // Inversion-of-control versions of 'once'.
	    Events.listenToOnce = function (obj, name, callback) {
	        // Map the event into a '{event: once}' object.
	        var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	        return this.listenTo(obj, events);
	    };
	    // Reduces the event callbacks into a map of '{event: onceWrapper}'.
	    // 'offer' unbinds the 'onceWrapper' after it has been called.
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
	    // Trigger one or many events, firing all bound callbacks. Callbacks are
	    // passed the same arguments as 'trigger' is, apart from the event name
	    // (unless you're listening on '"all"', which will cause your callback to
	    // receive the true name of the event as the first argument).
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
	    // Handles triggering the appropriate event callbacks.
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
	    // A difficult-to-believe, but optimized internal dispatch function for
	    // triggering events. Tries to keep the usual cases speedy (most internal
	    // Backbone events have 3 arguments).
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
	    // Aliases for backwards compatibility.
	    Events.bind = Events.on;
	    Events.unbind = Events.off;
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map