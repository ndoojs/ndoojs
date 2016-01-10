'use strict'
_     = @[\_]
$     = @[\jQuery] || @[\Zepto]

_n    = @ndoo

_vars = _n.vars
_func = _n.func
_stor = _n.storage

/* [home module] {{{ */
_n.app \home,
  indexAction: ->
    $('#container').html('hello ndoojs!')

  autoloadAction: (param) !->
    $content = $ '#content'
    $content.html 'module: home, action: indexAction'

  varsAction: (param) !->
    $content = $ '#content'
    $content.html "getListUrl: #{_vars.getListUrl}"

  serviceUsageAction: (param) !->
    _n.service 'user',
      hasSignin: ->
        return false

    user = _n.service 'user'
    console.log user.hasSignin()

    # _n.service 'falseValue', false
    # console.log _n.service 'falseValue'

/* }}} */

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
