((_n, depend) ->
  "use strict"
  _        = depend[\_]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage

  _n.block \example3, \block, do
    init: (elem, params) !->
      $elem = $ elem
      $elem.text 'block inited'

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
