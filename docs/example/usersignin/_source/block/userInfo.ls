"use strict"

_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

_n.block 'block.userInfo', do
  render: (type) ->
    if type is 'signFrom'
      html = """
        <form class="navbar-form navbar-right">
          <div class="form-group">
            <input type="text" placeholder="ID/Email" class="ctl-id form-control">
          </div>
          <div class="form-group">
            <input type="password" placeholder="Password" class="ctl-password form-control">
          </div>
          <button type="button" class="btn btn-success ctl-button">Sign in</button>
        </form>"""
    else
      user = _n.service \user
      userName = user.get \userName
      html = """
        <div class="navbar-text navbar-right">
          UserName: #{userName}
        </div>"""

    @$el.html html

  btnSuccess: (e) !->
    user = _n.service \user
    id = @$el.find('.ctl-id')
    password = @$el.find('.ctl-password')

    result = user.auth id.val!, password.val!
    unless result
      alert 'signin failer!'

  events:
    'click .ctl-button': 'btnSuccess'

  userSignin: !->
    @render \userInfo

  messages:
    'APP_USER_SIGNIN': 'userSignin'

  initEvent: ->
    if @events
      for key, item of @events
        _call = _.bind @[item], @
        eventMatch = key.match(/^([^\s]+)\s*(.*)$/)
        if eventMatch
          if eventMatch.length is 2
            @$el.on key, _call
          else if eventMatch.length is 3
            @$el.on eventMatch[1], eventMatch[2], _call

  initMessage: ->
    if @messages
      for key, item of @messages
        _call = _.bind @[item], @
        _n.on key, _call

  init: (elem, param) !->
    user = _n.service \user
    @$el = $ elem
    if user.hasSignin()
      @render('userInfo')
    else
      @render('signFrom')

    @initEvent()
    @initMessage()
