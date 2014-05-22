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
  _n._isDebug        = 0

  /* event module {{{ */
  _n.event =
    inited: false

    TEMP_ON: 1
    TEMP_TRIGGER: 2

    _temp: []

    _construct: (eventType) !->
      this.type = eventType

    on: (eventName, callback) !->
      @_temp.push do
        type: @TEMP_ON
        eventName: eventName
        callback: callback

    trigger: (eventName, eventType, data) !->
      @_temp.push do
        type: @TEMP_TRIGGER
        eventName: eventName
        eventType: eventType
        data: data

  _n.event.DEFAULT = new _n.event._construct \default
  _n.event.DELAY = new _n.event._construct \delay
  _n.event.STATUS = new _n.event._construct \status

  _n.on = (eventName, callback) ->
    @event.on eventName, callback

  _n.trigger = (eventName, eventType, data) ->

    if typeof eventType is \object and eventType isnt null and eventType.constructor is @.event._construct
      eventType = eventType.type
    else
      data      = eventType
      eventType = \default

    @event.trigger eventName, eventType, data
  /* }}} */

  _n.vars ||= {}
  _n.func ||= {}
  _n
)(@N = @ndoo ||= {})

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
