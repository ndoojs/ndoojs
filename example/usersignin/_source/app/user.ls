"use strict"

_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

_n.app \user,
  depend: [\service.user]
  signinAction: !->
    _n.on 'APP_USER_SIGNIN', ->
      user = _n.service \user
      $ \#hello .text "你好，#{user.get \userName}"
