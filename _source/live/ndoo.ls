/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主文件
"     Author: chenglf
"    Version: ndoo.js(v0.1b5)
" LastChange: 05/21/2014 15:32
" --------------------------------------------------
*/
((_n, depend) ->
  _        = depend[\_]
  $        = depend[\$]

  _vars    = _n.vars
  _func    = _n.func
  _stor    = _n.storage
  _core    = _n.core

  /* storage module {{{ */
  _n.storage = (key, value, force, destroy) ->
    data = _n[\storage].data

    if value is undefined
      return data[key]

    if destroy
      delete data[key]
      return true

    if not force and _.has data, key
      return false

    data[key] = value

  _n.storage.data = {}
  /* }}} */

  /* require module {{{ */
  _n.require = (depend, callback, type) !->
    if type is 'Do'
      Do.apply null, depend.concat callback
    else if type is 'seajs'
      seajs.use.apply null, depend.concat callback
  /* }}} */

  /* define app package {{{ */
  _n.app = (name, app) !->
    _n.app[name] ||= {}
    _.defaults _n.app[name] ||= {}, app
  /* }}} */

  /* event module {{{ */
  _n.event = _.extend _n.event,
    /* eventHandle {{{ */
    eventHandle: _.extend do
      * events   : {}
        listened : {}
      _core.Events
    /* }}} */
    /* 覆写on {{{ */
    on: (eventName, callback) !->
      eventHandle = @eventHandle
      # 绑定事件
      eventHandle.on eventName, callback
      # 标识监听
      eventHandle.listened[eventName] = true
      # 触发状态事件
      if _.has eventHandle.events, "STATUS:#eventName"
        callback eventHandle.events["STATUS:#eventName"]
        # eventHandle.trigger eventName, eventHandle.events["STATUS:"+eventName]
      # 触发延迟事件队列
      if _.has eventHandle.events, eventName
        for item in eventHandle.events[eventName]
          callback item
          # eventHandle.trigger eventName, item
        # 清除非状态事件队列
        # delete eventHandle.events[eventName]
    /* }}} */
    /* 覆写tigger {{{ */
    trigger: (eventName, eventType, data) !->
      eventHandle = @eventHandle
      # 处理普通事件
      if eventType is \default
        eventHandle.trigger eventName, data
      # 处理请求事件
      else if eventType is \delay
        # 如果事件已绑定
        if _.has eventHandle.listened, eventName
          eventHandle.trigger eventName, data
        # 暂存队列
        if _.has eventHandle.events, eventName
          return void if eventType is \status
          eventHandle.events[eventName].push data
        else
          eventHandle.events[eventName] = [data]

      # 状态仅可触发一次
      else if eventType is \status
        # 绑定状态事件
        if not _.has eventHandle.events, "STATUS:#eventName"
          eventHandle.events["STATUS:#eventName"] = data
          # 触发已绑定的事件
          if _.has eventHandle.listened, eventName
            eventHandle.trigger eventName, data
    /* }}} */
    /* 初始化 {{{ */
    init: !->
      if not @inited
        for item in @_temp
          if item.type is @TEMP_ON
            @on item.eventName, item.callback
          else if item.type is @TEMP_TRIGGER
            @trigger item.eventName, item.eventType, item.data
      @inited = true
    /* }}} */
  /* }}} */

  _.extend _n,
    /* base {{{ */
    pageId: $(\#scriptArea).data(\pageId)
    getPk: do ->
      _pk = 0
      ->
        ++_pk
    triggerPageStatus: !->
      # trigger PAGE_STATUS_FAST
      @trigger \PAGE_STATUS_FAST, @event.STATUS

      # trigger PAGE_STATUS_DOM and PAGE_STATUS_DOMORLOAD
      $ !~>
        @trigger \PAGE_STATUS_DOMPREP, @event.STATUS
        @trigger \PAGE_STATUS_DOM, @event.STATUS
        @trigger \PAGE_STATUS_DOMORLOAD, @event.STATUS

      # trigger PAGE_STATUS_LOAD
      $(window).bind \load, ~>
        @trigger \PAGE_STATUS_LOAD, @event.STATUS

      # trigger PAGE_STATUS_ROUTING
      @on 'PAGE_STATUS_DOM', !~>
        if @pageId
          #Backbone.history.start()
          @trigger 'PAGE_STATUS_ROUTING', @event.STATUS, @pageId
    /* }}} */
    /* router module {{{ */
    router: new (_core.Router.extend(
      parse: (route, url, callback) !->
        if not _.isRegExp route
          route = @_routeToRegExp route
        routeMatch = route.exec url
        if routeMatch isnt null
          callback.apply null, routeMatch.slice(1)
    ))

    dispatch: !->
      @.on \PAGE_STATUS_ROUTING, (data) !~>
        @router.parse ':controller/:action(/:params)', data, (controller, action, params) !~>
          if _.has @app, controller
            controller = @app[controller]
            if _.has controller, action+'Action'
              actionName = action
            else if _.has controller, '_emptyAction'
              actionName = '_empty'

            # @TODO 基于模块的依赖定义处理
            depend = controller[actionName+'Depend']
            run = !->
              if actionName
                controller[actionName+'Before'](params) if _.has controller, actionName+'Before'
                controller[actionName+'Action'] params
                controller[actionName+'After'](params) if _.has controller, actionName+'After'
            if depend and depend.length
              @require depend, run, \Do
              # Do.apply null, depend.concat ->
              #   if actionName
              #     controller[actionName+'Before'](params) if _.has controller, actionName+'Before'
              #     controller[actionName+'Action'] params
              #     controller[actionName+'After'](params) if _.has controller, actionName+'After'
            else
              run()
    /* }}} */

    /* init {{{ */
    init: !->
      # 实始化事件
      @event.init()
      # 初始化状态
      @triggerPageStatus()
      # 默认模块调度
      @dispatch()
    /* }}} */

  _n.init()
  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
# vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et:
