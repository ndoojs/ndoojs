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
