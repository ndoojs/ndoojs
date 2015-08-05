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

/* }}} */

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
