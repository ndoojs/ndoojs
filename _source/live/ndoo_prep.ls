/*
" --------------------------------------------------
"   FileName: ndoo_prep.ls
"       Desc: ndoo.js前置文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b3)
" LastChange: 03/07/2014 00:31
" --------------------------------------------------
*/
((_n) ->
  "use strict"
  _n._isDebug        = 0

  /* event module {{{ */
  _n.event = (name, type) ->
    "#type:#name"

  do (e = _n.event) !->
    /* const */
    e.TEMP_ON = 1
    e.TEMP_TRIGGER = 2

    /* init token */
    e.inited = false
    /* event stack */
    e._temp = []

    /* on api */
    e.on = (eventName, callback) !->
      @_temp.push do
        type      : @TEMP_ON
        eventName : eventName
        callback  : callback

    /* trigger api */
    e.trigger = (eventName, eventType, data) !->
      @_temp.push do
        type      : @TEMP_TRIGGER
        eventName : eventName
        eventType : eventType
        data      : data

    /* short event
    e.default = (name) -> "DEFAULT:#name"
    e.delay   = (name) -> "DELAY:#name"
    e.status  = (name) -> "STATUS:#name" */

  /* global event api */
  _n.on = (eventName, callback) ->
    eventName = eventName.split ' '
    for item in eventName
      @event.on item, callback

  _n.trigger = (eventName, ...data) ->
    _index = eventName.indexOf \:
    type = eventName.substring 0, _index++
    type ||= \DEFAULT
    name = eventName.substring _index

    @event.trigger name, type, data
  /* }}} */

  _n.vars ||= {}
  _n.func ||= {}

  _n
)(@N = @ndoo ||= {})

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
