do !->
  libPathBase = '../lib'
  jsPathbase = '../js'

  Do.setConfig 'autoLoad', false

  Do.define 'jquery', do
    path: "#{libPathBase}/jquery-2.1.1.min.js"
    type: 'js'

  Do.setLoaded ['jquery']
