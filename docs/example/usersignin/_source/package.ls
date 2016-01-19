"use strict"

Do.define \service.user,
  type: \js,
  path: \js/service/user.js


Do.define \lib.bootstrap_css,
  type: \css
  path: \css/bootstrap.min.css

Do.define \lib.bootstrap_theme,
  type: \css
  path: \css/bootstrap-theme.min.css
  requires: [\lib.bootstrap_css]

Do.define \lib.bootstrap_js,
  type: \js
  path: \js/bootstrap.min.js
  requires: [\lib.bootstrap_theme]

Do.define \service.user,
  type: \js
  path: \js/service/user.js

Do.define \user,
  type: \js
  path: \js/app/user.js
  requires: ['service.user']

ndoo.on \NAPP_DEFINE, !->
  ndoo.setApp \user
