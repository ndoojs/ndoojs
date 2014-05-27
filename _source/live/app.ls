((_n, depend) ->
  _        = depend[\_]
  Backbone = depend[\Backbone]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage

  /* [common prep] {{{ */
  _n.on \PAGE_STATUS_DOMPREP, !->

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

  /* [home module] {{{ */
  _n.app \example, do
    mainDepend: ['jquery']
    mainAction: (param) !->
      console.log param
  /* }}} */

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
