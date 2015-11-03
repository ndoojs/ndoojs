/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: ndoo.js(v1.0b2)
" LastChange: 11/03/2015 23:09
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _n, slice$ = [].slice;
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
     * @param {callback} callback 回调函数
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
     * @param data {any} 数据类型
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
   * @param {string} callback 事件回调
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
   * @param {array} data 数据
   */
  _n.trigger = function(eventName){
    var data, _index, type, name;
    data = slice$.call(arguments, 1);
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
