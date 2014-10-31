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
    if type is \Do
      Do.apply null, depend.concat callback
    else if type is \seajs
      seajs.use depend, callback
  /* }}} */

  /* define app package {{{ */
  _n.app = (name, app) !->
    _.defaults _n.app[name] ||= {}, app

  _n._apps ||= {}
  _n.setApp = (...apps) ->
    for app in apps
      unless _n._apps[app]
        _n._apps[app] = true

  _n.hasApp = (app) ->
    _.has _n._apps, app
    # _n._apps[app]

  _n.trigger 'STATUS:PAGE_APP_DEFINE'
  /* }}} */

  /* event module {{{ */
  _n.event = _.extend _n.event,
    /* eventHandle {{{ */
    eventHandle: _.extend do
      * events   : {}
        listened : {}
      _core.Events
    /* }}} */
    /* rewrite on {{{ */
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
    /* rewrite igger {{{ */
    trigger: (eventName, eventType, data) !->
      eventHandle = @eventHandle
      # 处理普通事件
      if eventType is \DEFAULT
        eventHandle.trigger.apply eventHandle, [eventName].concat data
      # 处理请求事件
      else if eventType is \DELAY
        # 如果事件已绑定
        if _.has eventHandle.listened, eventName
          eventHandle.trigger.apply eventHandle, [eventName].concat data
        # 暂存队列
        if _.has eventHandle.events, eventName
          return void if eventType is \STATUS
          eventHandle.events[eventName].push data
        else
          eventHandle.events[eventName] = [data]

      # 状态仅可触发一次
      else if eventType is \STATUS
        # 绑定状态事件
        if not _.has eventHandle.events, "#eventType:#eventName"
          eventHandle.events["#eventType:#eventName"] = data
          # 触发已绑定的事件
          if _.has eventHandle.listened, eventName
            eventHandle.trigger eventName, data
    /* }}} */
    /* init {{{ */
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
      _pk = +new Date!
      ->
        ++_pk
    triggerPageStatus: !->
      # trigger PAGE_STATUS_FAST
      @trigger \STATUS:PAGE_STATUS_FAST

      # trigger PAGE_STATUS_DOM and PAGE_STATUS_DOMORLOAD
      $ !~>
        @trigger \STATUS:PAGE_STATUS_DOMPREP
        @trigger \STATUS:PAGE_STATUS_DOM
        @trigger \STATUS:PAGE_STATUS_DOMORLOAD

      # trigger PAGE_STATUS_LOAD
      $(window).bind \load, ~>
        @trigger \STATUS:PAGE_STATUS_LOAD

      # trigger PAGE_STATUS_ROUTING
      @on \PAGE_STATUS_DOM, !~>
        if @pageId
          #Backbone.history.start()
          @trigger \STATUS:PAGE_STATUS_ROUTING, @pageId
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
    /* }}} */
    /* dispatch {{{ */
    dispatch: !->
      /* before and after filter event */
      @on 'APP_ACTION_BEFORE APP_ACTION_AFTER', (data, controller, actionName,
      params) !->
        if data
          /* init filter array */
          unless _.isArray(data.filter)
            data.filter = [].concat data.filter

          isRun = true
          /* init only array */
          if data.only
            unless _.isArray(data.only)
              data.only = [].concat data.only

            if _.indexOf(data.only, actionName) < 0
              isRun = false
            /* init except array */
          else if data.except
            unless _.isArray(data.except)
              data.except = [].concat data.except

            if _.indexOf(data.except, actionName) > -1
              isRun = false

          if isRun
            for filter in data.filter
              controller[filter+'Filter'](params)
              # filter.call null, controller
      /* call action */
      @on \PAGE_APP_LOADED, (app, controller, action, params) !->
        if _.has app, controller
          controllerName = controller
          controller = app[controller]
          if _.has controller, action+\Action
            actionName = action
          else if _.has controller, \_emptyAction
            actionName = \_empty

          # @TODO 基于模块的依赖定义处理
          depend ||= controller[\depend]
          depend = (depend || []).concat controller[actionName+\Depend] || []

          before = controller.before
          after = controller.after

          run = !->
            if actionName
              _n.trigger \APP_ACTION_BEFORE, before,
                controller, actionName, params

              _n.trigger "APP_#{controllerName.toUpperCase!}_ACTION_BEFORE",
                controller, actionName, params

              controller[actionName+\Before](params) if _.has controller, actionName+\Before
              controller[actionName+\Action](params) if _.has controller, actionName+\Action
              controller[actionName+\After](params) if _.has controller, actionName+\After

              _n.trigger "APP_#{controllerName.toUpperCase!}_ACTION_AFTER",
                controller, actionName, params

              _n.trigger \APP_ACTION_AFTER,
                after, controller, actionName, params

          if depend and depend.length
            _n.require _.uniq(depend), run, \Do
          else
            run!
      /* page route */
      @on \PAGE_STATUS_ROUTING, (data) !~>
        @router.parse ':controller/:action(/:params)', data,
        (controller, action, params) !~>
          if _.has @app, controller
            @trigger \PAGE_APP_LOADED, @app, controller, action, params
          else if _n.hasApp controller
            @require ["ndoo.app.#{controller}"], !->
              _n.trigger \PAGE_APP_LOADED, _n.app, controller, action, params
            , \Do
    /* }}} */

    /* init {{{ */
    init: !->
      # initial event
      @event.init()
      # initial page status
      @triggerPageStatus()
      # module dispatch
      @dispatch()
    /* }}} */

  _n.init()
  _n
)(@N = @ndoo ||= {}, _: _, $: jQuery)
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
