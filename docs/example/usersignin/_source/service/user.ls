"use strict"

_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

class userService
  (userState) ->
    if not userState
      userState = 
        isSign = false
        userName = ''
    @set userState

  set: (set) ->
    _.extend @, set

  get: (key) ->
    if _.has @, key
      this[key]
    else
      undefined

  sign: (id, password) ->
    if id is 'user' and password is '123456'
      @set do
        isSign: true
        userName: id
      true

    false

  hasSigned:
    @isSign


_n.service 'service.user',
  creator: userService
  init: ->
    unless @instance
      @instance = new @creator()
    @instance
