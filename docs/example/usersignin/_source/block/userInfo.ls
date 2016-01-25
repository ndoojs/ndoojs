"use strict"

_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

class UserInfo
  render: (type) ->
    if type is 'signFrom'
      html = """
        <form class="navbar-form navbar-right">
          <div class="form-group">
            <input type="text" placeholder="用户名" class="ctl-id form-control">
          </div>
          <div class="form-group">
            <input type="password" placeholder="密码" class="ctl-password form-control">
          </div>
          <button type="button" class="btn btn-success ctl-button">登录</button>
        </form>"""
    else
      user = _n.service \user
      userName = user.get \userName
      html = """
        <div class="navbar-text navbar-right">
          你好: #{userName}
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

_n.block 'block.userInfo', new UserInfo()
