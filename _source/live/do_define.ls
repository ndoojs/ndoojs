((_n) ->
  libPathBase = '../lib'
  jsPathbase = '../js'

  ndooPathBase = '../js'

  Do.setConfig \autoLoad, false

  Do.define 'jquery', do
    path: "#{libPathBase}/jquery-2.1.1.min.js"
    type: \js

  Do.setLoaded ['jquery']

  Do.define 'ndoo.app.test', do
    path: "#{ndooPathBase}/ndoo.app.test.js"
    type: \js

  _n.on 'PAGE_APP_DEFINE', !->
    _n.setApp \test

)(@N = @ndoo ||= {})
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
