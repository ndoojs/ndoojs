/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b3)
" LastChange: 03/07/2014 00:31
" --------------------------------------------------
*/
(function(_n){
  _n._isDebug = 0;
  /* event module {{{ */
  _n.event = {
    inited: false,
    TEMP_ON: 1,
    TEMP_TRIGGER: 2,
    _temp: [],
    _construct: function(eventType){
      this.type = eventType;
    },
    on: function(eventName, callback){
      this._temp.push({
        type: this.TEMP_ON,
        eventName: eventName,
        callback: callback
      });
    },
    trigger: function(eventName, eventType, data){
      this._temp.push({
        type: this.TEMP_TRIGGER,
        eventName: eventName,
        eventType: eventType,
        data: data
      });
    }
  };
  _n.event.DEFAULT = new _n.event._construct('default');
  _n.event.DELAY = new _n.event._construct('delay');
  _n.event.STATUS = new _n.event._construct('status');
  _n.on = function(eventName, callback){
    return this.event.on(eventName, callback);
  };
  _n.trigger = function(eventName, eventType, data){
    if (typeof eventType === 'object' && eventType !== null && eventType.constructor === this.event._construct) {
      eventType = eventType.type;
    } else {
      data = eventType;
      eventType = 'default';
    }
    return this.event.trigger(eventName, eventType, data);
  };
  /* }}} */
  _n.vars || (_n.vars = {});
  _n.func || (_n.func = {});
  return _n;
})(this.N = this.ndoo || (this.ndoo = {}));
