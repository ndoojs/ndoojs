_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

/* [home module] {{{ */
_n.app \home,
  indexAction: (param) !->
    $content = $ '#content'
    $content.html 'module: home, action: indexAction'

/* }}} */

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
