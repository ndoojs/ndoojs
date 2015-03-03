/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b3)
" LastChange: 03/07/2014 00:31
" --------------------------------------------------
*/
var slice$ = [].slice;
(function(_n){
  "use strict";
  _n._isDebug = 0;
  /* event module {{{ */
  _n.event = function(name, type){
    return type + ":" + name;
  };
  (function(e){
    /* const */
    e == null && (e = _n.event);
    e.TEMP_ON = 1;
    e.TEMP_TRIGGER = 2;
    /* init token */
    e.inited = false;
    /* event stack */
    e._temp = [];
    /* on api */
    e.on = function(eventName, callback){
      this._temp.push({
        type: this.TEMP_ON,
        eventName: eventName,
        callback: callback
      });
    };
    /* trigger api */
    e.trigger = function(eventName, eventType, data){
      this._temp.push({
        type: this.TEMP_TRIGGER,
        eventName: eventName,
        eventType: eventType,
        data: data
      });
    };
    /* short event
    e.default = (name) -> "DEFAULT:#name"
    e.delay   = (name) -> "DELAY:#name"
    e.status  = (name) -> "STATUS:#name" */
  })();
  /* global event api */
  _n.on = function(eventName, callback){
    var i$, len$, item, results$ = [];
    eventName = eventName.replace(/\s*/g, '').split(',');
    for (i$ = 0, len$ = eventName.length; i$ < len$; ++i$) {
      item = eventName[i$];
      results$.push(this.event.on(item, callback));
    }
    return results$;
  };
  _n.trigger = function(eventName){
    var data, _index, type, name;
    data = slice$.call(arguments, 1);
    _index = eventName.indexOf(':');
    type = eventName.substring(0, _index++);
    type || (type = 'DEFAULT');
    name = eventName.substring(_index);
    return this.event.trigger(name, type, data);
  };
  /* }}} */
  _n.vars || (_n.vars = {});
  _n.func || (_n.func = {});
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}));
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
