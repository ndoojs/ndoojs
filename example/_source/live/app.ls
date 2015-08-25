"use strict"
_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

/* [common prep] {{{ */
_n.on 'PAGE_STATUS_DOMPREP, PAGE_RELOAD', !->

  init_tpl = ->
    $code = $ \#tplCode
    if $code.length
      text = $code.get(0).text
      if text.replace(/^\s*$/g, '') isnt ''
        try
          $(text).appendTo \body
        catch e
          return false
    true
  /* init template */
/* }}} */

_n.on \NAPP_EXAMPLE_ACTION_BEFORE, (controller, actionName, params) !->
  console.log \NAPP_EXAMPLE_ACTION_BEFORE

/* [home module] {{{ */
_n.app \example,
  before:
    * filter: 'test, test2'
      only: \main

  after:
    filter: \afterTest
    only: \main

  testFilter: !->
    console.log \filter_before!

  test2Filter: !->
    console.log \test2Filter!

  afterTestFilter: !->
    console.log \filter_after!

  mainDepend: ['jquery']
  mainAction: (param) !->
    _stor('abc', 1);
    _stor('bac', 2);
    console.log _stor('abc')
    _stor('abc', 2, _stor.REWRITE)
    console.log _stor('abc')
    _stor('abc', null, _stor.DESTROY)
    console.log _stor('abc')
    console.log 'test event'
    _n.on 'testEvent', (data, data2) !->
      console.log data
      console.log data2
    _n.trigger 'testEvent', 'testEvent', 'kkk'
    console.log param
    _n.require ['../example/lib/jquery-1.11.1.js', '../example/lib/jquery-mytest.js'], (a) !->
      a('body').mytest!;
    , \seajs
/* }}} */
/* [ndoo module] {{{ */
_n.app \test, do
  mainAction: (param) !->
    console.log 'module: test action: mainAction'

  blockTestAction: (param) !->
    console.log 'module: test action: blockTestAction'

  eventOffAction: (param) !->
    _n.on 'event_off_test', ->
      console.log 'event_off_test trigger'

    _n.trigger 'event_off_test'

    _n.off 'event_off_test'

    console.log 'event off'
    _n.trigger 'event_off_test'

/* }}} */
# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
