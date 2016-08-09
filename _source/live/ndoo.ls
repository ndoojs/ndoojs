/*
" --------------------------------------------------
"   FileName: ndoo.ls
"       Desc: ndoo.js主文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 08/02/2016 23:41
" --------------------------------------------------
*/

"use strict"
_        = @[\_]
$        = @[\jQuery] or @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func

/* default _lib {{{ */
if not _n._lib && @[\Backbone]
  _n._lib = @[\Backbone]
/* }}} */

/* storage module {{{ */
/**
 * 变量存储
 *
 * @method
 * @name storage
 * @memberof ndoo
 * @param {string} key 键名
 * @param {variable} value 值
 * @param {const} option 选项，覆盖或删除
 * @example // alias _stor
 * var _stor = ndoo.storage;
 * // set abc vlaue 1
 * _stor('abc', 1); // 1
 * // set abc value 2 failed
 * _stor('abc', 2); // false
 * // set abc value 2
 * _stor('abc', 2, _stor.REWRITE); // 2
 * // delete abc
 * _stor('abc', null, _stor.DESTROY); // true
 */
_n.storage = (key, value, option) ->
  destroy = option .&. _n.storage.DESTROY
  rewrite = option .&. _n.storage.REWRITE

  data = _n.storage._data
  if value is undefined
    return data[key]

  if destroy
    delete data[key]
    return true

  if not rewrite and _.has data, key
    return false

  data[key] = value

  data[key]

/**
 * alias ndoo.storage
 *
 */
_stor    = _n.storage

_n.storage._data = {}
/**
 * storage重写常量
 *
 * @name REWRITE
 * @memberof ndoo.storage
 */
_n.storage.REWRITE = 1
/**
 * storage删除常量
 *
 * @name DESTROY
 * @memberof ndoo.storage
 */
_n.storage.DESTROY = 2
/* }}} */
/* require module {{{ */
/**
 * 依赖加载
 *
 * @method
 * @name require
 * @memberof ndoo
 * @param {array} depend 依赖
 * @param {function} callback 回调函数
 * @param {string} type 加载器类型
 * @example // ndoo alias _n
 * var _n = ndoo;
 * _n.require(['lib/jquery-1.11.1.js', 'lib/jquery-mytest.js'], function(a){
 *   a('body').mytest();
 * }, 'seajs');
 */
_n.require = (depend, callback, type) !->
  if type.toLowerCase! is \do
    Do.apply null, depend.concat callback
  else if type.toLowerCase! is \seajs
    seajs.use depend, callback
/* }}} */
/* define block module {{{ */
_n._blockData ||= do
  _block   : {}
  _app     : {}
  _service : {}
  _exist   : {}

_n._block = (base, namespace, name, block) ->
  # 只允许app/block/service
  if base is \block or base is \app or base is \service
    data = _n._blockData["_#{base}"]
  else
    return false

  # 去除头尾的分隔符，分割成数组
  if namespace
    nsArr = namespace.replace /^[/.]|[/.]$/g, '' .split /[/.]/
  else
    nsArr = []

  temp = data

  if block or arguments.length > 3
    for ns in nsArr
      temp = temp[ns] ||= {}

    # app/block只允许真值
    if block and (base is \app or base is \block)
      if typeof block is 'object'
        if base is \app and temp[name]
          result = _.defaults temp[name], block
        else
          result = temp[name] = block
      else if typeof block is 'function'
        result = temp[name] = block
      else
        result = false
    # service允许任意值
    else if base is \service
      result = temp[name] = block
      success = true
    else
      result = false

    # 设置成功时标识exist字段
    if result or success
      if namespace
        _n._blockData[\_exist]["#base.#namespace.#name"] = true
      else
        _n._blockData[\_exist]["#base.#name"] = true

    return result

  else
    # 返回指定字段
    for ns in nsArr
      unless _.has temp, ns
        return undefined
      temp = temp[ns]
    temp[name]

/* }}} */
/* define app module {{{ */
/**
 * 检测是否存在指定app
 *
 * @method
 * @name hasApp
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @return {boolean} 是否在存指定的app
 */
_n.hasApp = (namespace) ->
  _n._blockData[\_exist]["app.#namespace"]

/**
 * 标识指定app已存在
 *
 * @method
 * @name setApp
 * @memberof ndoo
 * @param {string} namespace 名称空间
 */
_n.setApp = (namespace) ->
  _n._blockData[\_exist]["app.#namespace"] = true

/**
 * 添加app实现
 *
 * @method
 * @name app
 * @memberof ndoo
 * @param {string} namespace 名称空间
 * @param {object} controller 控制器
 */
_n.app = (namespace, controller) ->
  if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
    [null, namespace, controllerName] = nsmatch
  else
    [controllerName, namespace] = [namespace, null]

  if arguments.length > 1
    _n._block \app, namespace, controllerName, controller
  else
    _n._block \app, namespace, controllerName

_n.trigger 'STATUS:NAPP_DEFINE'
/* }}} */
/* event module {{{ */
_n.event = _.extend _n.event,
  /* eventHandle {{{ */
  eventHandle: _.extend do
    * events   : {}
      listened : {}
    _n._lib.Events
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
      callback.apply eventHandle, eventHandle.events["STATUS:#eventName"]
      # eventHandle.trigger eventName, eventHandle.events["STATUS:"+eventName]
    # 触发延迟事件队列
    if _.has eventHandle.events, eventName
      # temp = []
      # while item = eventHandle.events[eventName].shift()
      #   kepp = callback.apply eventHandle, item
      #   temp.push item if kepp isnt false
      #
      # eventHandle.events[eventName] = temp
      for item in eventHandle.events[eventName]
        callback.apply eventHandle, item
      # 清除非状态事件队列
      # delete eventHandle.events[eventName]
  /* }}} */
  /* off api {{{ */
  off: (eventName) !->
    eventHandle = @eventHandle
    eventHandle.off eventName
    delete eventHandle.listened[eventName]
    delete eventHandle.events[eventName]
  /* off }}} */
  /* rewrite trigger {{{ */
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
      unless _.has eventHandle.events, eventName
        eventHandle.events[eventName] = []

      eventHandle.events[eventName].push data

    # 状态仅可触发一次
    else if eventType is \STATUS
      # 绑定状态事件
      if not _.has eventHandle.events, "#eventType:#eventName"
        eventHandle.events["#eventType:#eventName"] = data
        # 触发已绑定的事件
        if _.has eventHandle.listened, eventName
          eventHandle.trigger.apply eventHandle, [eventName].concat data
  /* }}} */
  /* init {{{ */
  /**
   * init 事件初始化
   *
   * @private
   * @name init
   * @memberof ndoo.event
   */
  init: !->
    if not @inited
      for item in @_temp
        if item.type is @TYPE_ON
          @on item.eventName, item.callback
        else if item.type is @TYPE_TRIGGER
          @trigger item.eventName, item.eventType, item.data
    @inited = true
  /* }}} */
# initiation event module
_n.event.init!
/* }}} */
_.extend _n,
  /* base {{{ */
  /**
   * page id
   *
   * @name pageId
   * @memberof ndoo
   * @type {string}
   */
  pageId: ''
  /**
   * initPageId 初始化 pageId
   *
   * @private
   * @name initPageId
   * @memberof ndoo
   */
  initPageId: (id) !->
    if @pageId
      return

    if typeof document isnt 'undefined'
      if el = document.getElementById id || \scriptArea
        @pageId = el.getAttribute('data-page-id') || ''

    if not @pageId and id
      @pageId = id
  /**
   * 获取唯一key
   *
   * @method
   * @name getPk
   * @memberof ndoo
   * @return {string} 键名
   */
  getPk: do ->
    _pk = +new Date!
    (prefix='')-> prefix+(++_pk)
  /* }}} */
  /* router module {{{ */
  /**
   * 内置路由通过正则配匹各部件
   *
   * @private
   * @name router
   * @memberof ndoo
   * @type {object}
   */
  router: do
    parse: (route, url, callback) !->
      routeMatch = route.exec url
      if routeMatch isnt null
        callback.apply null, routeMatch.slice(1)
  /* }}} */
  /* dispatch {{{ */
  /**
   * 路由函数
   *
   * @private
   * @method
   * @name dispatch
   * @memberof ndoo
   */
  dispatch: !->
    /* before and after filter event */
    filterHaldner = (type, controller, actionName, params) !->
      if type is \before
        data = controller.before
      else if type is \after
        data = controller.after

      unless data
        return

      if typeof data is 'object'
        _data = [].concat data

      for dataItem in _data
        /* init filter array */
        _filter = dataItem.filter
        unless _.isArray(_filter)
          _filter = [].concat _filter.split /\s*,\s*|\s+/

        isRun = true
        /* init only array */
        if dataItem.only
          _only = dataItem.only
          unless _.isArray(_only)
            _only = [].concat _only.split /\s*,\s*|\s+/


          if _.indexOf(_only, actionName) < 0
            isRun = false
          /* init except array */
        else if dataItem.except
          _except = dataItem.except
          unless _.isArray(_except)
            _except = [].concat _except.split /\s*,\s*|\s+/

          if _.indexOf(_except, actionName) > -1
            isRun = false

        if isRun
          for filter in _filter
            controller[filter+\Filter]?(actionName, params)
            # controller[filter+'Filter'].apply controller, [actionName, params]
            # filter.call null, controller

    @on 'NAPP_ACTION_BEFORE', (...params) ->
      filterHaldner.apply null, ['before'].concat params
    @on 'NAPP_ACTION_AFTER', (...params) ->
      filterHaldner.apply null, ['after'].concat params

    /* call action */
    @on \NAPP_LOADED, (namespace, controllerName, actionName, params) !->
      if namespace
        controller = _n.app "#namespace.#controllerName"
      else
        controller = _n.app controllerName

      if !_.has(controller, "#{actionName}Action") and
      _.has controller, \_emptyAction
        actionName = \_empty

      # @TODO 基于模块的依赖定义处理
      depend = []
      if controller[\depend]
        depend = depend.concat controller[\depend]

      if controller[actionName+\Depend]
        depend = depend.concat controller[actionName+\Depend]

      filterPrefix = controllerName
      if namespace
        filterPrefix = ("#namespace.#controllerName").replace /\./g, \_
      filterPrefix = filterPrefix.toUpperCase!

      run = !->
        if actionName
          _n.trigger \NAPP_ACTION_BEFORE, controller, actionName, params

          _n.trigger "NAPP_#{filterPrefix}_ACTION_BEFORE",
            controller, actionName, params

          controller[actionName+\Before]?(params)
          controller[actionName+\Action]?(params)
          controller[actionName+\After]?(params)

          _n.trigger "NAPP_#{filterPrefix}_ACTION_AFTER",
            controller, actionName, params

          _n.trigger \NAPP_ACTION_AFTER, controller, actionName, params

        _n.trigger \STATUS:NBLOCK_INIT

      if depend.length
        _n.require _.uniq(depend), run, \Do
      else
        run!

    /* page route */
    @on \PAGE_STATUS_ROUTING, (data) !~>
      # @router.parse ':controller/:action(/:params)', data,
      @router.parse //
        ^(?:\/?)           # ^[/]
        (.*?)              # [:controller]
        (?:\/?([^/?#]+))   # /:action
        (?:\?(.*?))?       # [?:params]
        (?:\#(.*?))?$      # [#:hash]$
      //, data, (controller, action, params) !~>
        if nsmatch = controller.match /(.*?)(?:[/.]([^/.]+))$/
          [null, namespace, controller] = nsmatch
        else
          namespace = void

        if namespace
          namespace = namespace.replace(/\//g, '.');
          pkg = "#namespace.#controller"
        else
          pkg = controller

        if _n.app pkg
          @trigger \NAPP_LOADED, namespace, controller, action, params
        else if _n.hasApp pkg
          @require ["#pkg"], !->
            _n.trigger \NAPP_LOADED, namespace, controller, action, params
          , \Do
        else
          @trigger \STATUS:NBLOCK_INIT
  /* }}} */
  /* trigger {{{ */
  /**
   * 触发页面状态
   *
   * @private
   * @method
   * @name triggerPageStatus
   * @memberof ndoo
   */
  triggerPageStatus: (depend) !->
    call = !~>
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

    ###loading depend###
    if depend
      @require [].concat(depend), call, \Do
    else
      call!
  /* }}} */
  /* init {{{ */
  /**
   * 初始化页面
   *
   * @method
   * @name init
   * @memberof ndoo
   * @param {string} id DOM的ID或指定ID
   * @param {array} depend 依赖
   * @example // ndoo alias _n
   * _n.init('home/index')
   * // set depend
   * _n.init('home/index', ['library', 'common'])
   */
  init: (id, depend) ->
    if _.isArray id
      [id, depend] = ['', id]

    # initiation page id
    @initPageId id
    # initiation ndoo event listener
    @dispatch!
    # trigger status
    @triggerPageStatus depend

    @
  /* }}} */

# _n.init!

/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
