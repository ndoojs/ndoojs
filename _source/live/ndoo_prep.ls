/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 14:11
" --------------------------------------------------
*/

"use strict"

if @ndoo
  return

@N = @ndoo ||= {}

/**
 * ndoojs 全局名称空间，短名称N
 *
 * @namespace ndoo
 */
_n = @ndoo

/**
 * _isDebug 是否开启调试模式
 *
 * @name _isDebug
 * @memberof ndoo
 * @type {boolean}
 */
_n._isDebug        = 0

/* event module {{{ */
_n.event = (name, type) ->
  "#type:#name"

/**
 * 事件模块
 *
 * @namespace
 * @name event
 * @memberof ndoo
 * @param {string} name 事件名称
 * @param {string} type 事件类型
 */
do (e = _n.event) !->

  /**
   * 暂存数据类型
   *
   * @name TYPE_ON
   * @memberof ndoo.event
   * @type {number}
   */
  e.TYPE_ON = 1

  /**
   * 暂存数据类型
   *
   * @name TYPE_TRIGGER
   * @memberof ndoo.event
   * @type {number}
   */
  e.TYPE_TRIGGER = 2

  /**
   * init token
   *
   * @name inited
   * @memberof ndoo.event
   * @type {boolean}
   */
  e.inited = false

  /**
   * event stack
   *
   * @private
   * @name _temp
   * @memberof ndoo.event
   * @type {array}
   */
  e._temp = []

  /**
   * on api
   *
   * @method
   * @name on
   * @memberof ndoo.event
   * @param {string} eventName 事件名称
   * @param {function} callback 回调函数
   */
  e.on = (eventName, callback) !->
    @_temp.push do
      type      : @TYPE_ON
      eventName : eventName
      callback  : callback

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
  e.trigger = (eventName, eventType, data) !->
    @_temp.push do
      type      : @TYPE_TRIGGER
      eventName : eventName
      eventType : eventType
      data      : data

  /**
   * off api
   *
   * @method
   * @name off
   * @memberof ndoo.event
   */
  e.off = !->

  /* short event
  e.default = (name) -> "DEFAULT:#name"
  e.delay   = (name) -> "DELAY:#name"
  e.status  = (name) -> "STATUS:#name" */

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
_n.on = (eventName, callback) ->
  /* split 'a, b, c' to ['a', 'b', 'c']
     split 'a b c' to ['a' ,'b', 'c'] */
  eventName = eventName.split /\s*,\s*|\s+/
  for name in eventName
    @event.on name, callback

/**
 * global trigger
 *
 * @method
 * @name trigger
 * @memberof ndoo
 * @param {string} eventName 事件名称
 * @param {variable} data 数据，可以是多个
 */
_n.trigger = (eventName, ...data) ->
  _index = eventName.indexOf \:
  type = eventName.substring 0, _index++
  type ||= \DEFAULT
  name = eventName.substring _index

  @event.trigger name, type, data

/**
 * global off
 *
 * @method
 * @name off
 * @memberof ndoo
 * @param {string} eventName 事件名称
 */
_n.off = (eventName) ->
  eventName = eventName.split /\s*,\s*|\s+/
  for name in eventName
    @event.off name

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
_n.vars ||= {}

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
_n.func ||= {}


/**
 * 依赖库存储空间
 */
_n._lib ||= {}

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
