(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ndoo"] = factory();
	else
		root["ndoo"] = factory();
})(this, function() {
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

	module.exports = __webpack_require__(16);


/***/ },
/* 1 */,
/* 2 */,
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
	        _super.call(this);
	        this.event = basic_1.EventBasic;
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
	        this.vars = {};
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
	        this.func = {};
	        /**
	         * 依赖库存储空间
	         */
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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var prepData_1 = __webpack_require__(6);
	prepData_1.setPrepData();
	var prep_1 = __webpack_require__(3);
	module.exports = new prep_1.Prep;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=ndoo_prep.js.map