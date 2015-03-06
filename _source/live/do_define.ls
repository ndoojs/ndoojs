((_n) ->
  libPathBase = '../lib'
  jsPathbase = '../js'

  ndooPathBase = '../js'

  Do.setConfig \autoLoad, false

  Do.define 'jquery', do
    path: "#{libPathBase}/jquery-2.1.1.min.js"
    type: \js

  Do.setLoaded ['jquery']

  Do.define 'ndoo.test', do
    path: "#{ndooPathBase}/ndoo.app.test.js"
    type: \js

  _n.on 'NAPP_DEFINE', !->
    _n.setApp 'ndoo.test'

  Do.define 'test.main', do
    path: "#{ndooPathBase}/ndoo.block.test.js"
    type: \js

  _n.on 'NBLOCK_DEFINE', !->
    _n.setBlock 'test.main'


)(@N = @ndoo ||= {})
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
