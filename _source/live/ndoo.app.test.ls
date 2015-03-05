((_n, depend) ->
  _        = depend[\_]
  Backbone = depend[\Backbone]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage

  /* [home module] {{{ */
  _n.on \NAPP_TEST_ACTION_BEFORE, (controller, actionName, params) !->
    console.log \NAPP_TEST_ACTION_BEFORE

  _n.app \ndoo.test, do
    before: do
      filter: \test
      only: \main

    after: do
      filter: \afterTest
      only: \main

    testFilter: !->
      console.log \filter_before!

    afterTestFilter: !->
      console.log \filter_after!

    mainDepend: ['jquery']
    mainAction: (param) !->
      console.log "module: ndoo.test action: mainAction"

  /* }}} */

  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)

# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:

