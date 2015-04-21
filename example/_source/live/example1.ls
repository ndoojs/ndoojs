((_n, depend) ->
  _        = depend[\_]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage

  /* [home module] {{{ */
  _n.app \home,
    indexAction: (param) !->
      $content = $ '#content'
      $content.html 'module: home, action: indexAction'

  /* }}} */

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
