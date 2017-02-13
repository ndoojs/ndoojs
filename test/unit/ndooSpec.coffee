describe 'ndoo framework test >', ->

  describe 'util test >', -> # {{{

    describe 'getPk test >', -># {{{
      _n = null

      beforeAll ->
        _n = ndoo

      it 'getPk should match num', ->
        expect(_n.getPk()).toMatch /^\d+$/

      it 'getPk should prefix', ->
        expect(_n.getPk('test_')).toMatch /^test_\d+$/# }}}

    describe 'page id test >', -># {{{
      _n = null

      beforeAll ->
        _n = ndoo
        _n.reset()

      it 'get page id should be empty', ->
        expect(_n.pageId).toBe ''

      describe 'init call', ->
        initPageId = null
        beforeAll ->
          initPageId = _n.initPageId
          spyOn(_n, 'initPageId').and.callThrough()
          _n.init 'home/index'

        afterAll ->
          # restore initPageId spy
          _n.initPageId = initPageId

        it 'initPageId should be call', ->
          expect(_n.initPageId).toHaveBeenCalled()

        it 'initPageId param should be home/index', ->
          expect(_n.initPageId).toHaveBeenCalledWith 'home/index'

        it 'pageId should be home/index', ->
          expect(_n.pageId).toBe 'home/index'# }}}

    describe 'storage test >', -># {{{
      _stor = undefined

      beforeAll ->
        ndoo.reset()
        _stor = ndoo.storage

      it 'ndoo.storage should define', ->
        expect(_stor).toBeDefined()

      it 'get abc, should be undefined', ->
        expect(_stor('abc')).toBeUndefined()

      describe 'set value >', ->
        it 'set abc to 123, should be 123', ->
          expect(_stor('abc', 123)).toBe 123

        it 'get abc after set, should be 123 ', ->
          expect(_stor('abc')).toBe 123

      describe 'rewrite >', ->
        it 'rewrite abc without option, should be Falsy', ->
          expect(_stor('abc', 456)).toBeFalsy()
        it 'get abc after rewrite, should be 123', ->
          expect(_stor('abc')).toBe 123

        it 'rewrite abc add option, should be Truthy', ->
          expect(_stor 'abc', 456, _stor.REWRITE).toBeTruthy()
        it 'get abc after rewrite, should be 456', ->
          expect(_stor('abc')).toBe 456

      describe 'destroy >', ->
        it 'remove abc for storage, should be true', ->
          expect(_stor('abc', null, _stor.DESTROY)).toBe true

        it 'get abc for storage, should be undefined', ->
          expect(_stor('abc')).toBeUndefined()# }}}

    describe 'loader test>', -> #{{{
      _n = null

      beforeAll ->
        _n = ndoo

      it 'do loader should be define', ->
        expect(_n._loader['initLoader']).toBeDefined()

      it 'init loader should be truthy', ->
        expect(_n._loader['init']).toBeTruthy()

      describe 'set loader test>', ->
        testLoaderSpy = jasmine.createSpy 'testLoaderSpy'

        beforeEach ->
          _n.setLoader 'test', testLoaderSpy

        afterEach ->
          delete _n._loader['testLoader']
        
        it 'test loader should be define', ->
          expect(_n._loader['testLoader']).toBeDefined()

        it 'set test Loader should be equal spy', ->
          expect(_n._loader['testLoader']).toEqual testLoaderSpy #}}}

    #}}}

  describe 'event test >', -># {{{
    _n = null

    beforeAll ->
      _n = ndoo

    afterAll ->
      _n = null

    describe 'default event >', ->
      defaultEvent1 = null

      beforeAll ->
        _n.reset()
        defaultEvent1 = jasmine.createSpy 'defaultEvent1'

      afterAll ->
        defaultEvent1 = null

      it 'defaultEvent1 not be call', ->
        _n.on 'defaultTest', defaultEvent1
        expect(defaultEvent1).not.toHaveBeenCalled()

      it 'trigger event default event should be call', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1).toHaveBeenCalled()

      it 'again trigger default event call count should be 2', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1.calls.count()).toBe 2

    describe 'delay event >', ->
      delayEvent1 = null

      beforeAll ->
        _n.reset()
        delayEvent1 = jasmine.createSpy 'delayEvent1'

      afterAll ->
        delayEvent1 = null

      it 'before event callback should be call', ->
        _n.trigger 'DELAY:delayTest', 'trigger 1'
        _n.on 'delayTest', delayEvent1
        expect(delayEvent1).toHaveBeenCalled()

      it 'again trigger, event callback call count should be 2', ->
        _n.trigger 'DELAY:delayTest', 'trigger 2'
        # console.log _n.event.eventHandle.events['delayTest']
        expect(delayEvent1.calls.count()).toBe 2

      it 'again bind callback call count should be 2', ->
        delayEvent2 = jasmine.createSpy 'delayEvent2'
        _n.on 'delayTest', delayEvent2
        expect(delayEvent2.calls.count()).toBe 2

    describe 'status event >', ->
      statusEvent1 = null
      statusEvent2 = null

      beforeAll ->
        _n.reset()
        statusEvent1 = jasmine.createSpy 'statusEvent1'
        statusEvent2 = jasmine.createSpy 'statusEvent2'

      afterAll ->
        statusEvent1 = null
        statusEvent2 = null

      it 'before status event should be call', ->
        _n.on 'statusTest', statusEvent1
        _n.trigger 'STATUS:statusTest'
        expect(statusEvent1).toHaveBeenCalled()

      it 'before status event call count should be 1', ->
        expect(statusEvent1.calls.count()).toBe 1

      it 'after status should be call', ->
        _n.on 'statusTest', statusEvent2
        expect(statusEvent2).toHaveBeenCalled()

      it 'again trigger status event call count should be 1', ->
        _n.trigger 'STATUS:statusTest'
        expect(statusEvent1.calls.count()).toBe 1

      it 'NAPP_DEFINE should be trigger', ->
        appDefineCallback = jasmine.createSpy 'NAPP_DEFINE'
        _n.on 'NAPP_DEFINE', appDefineCallback
        expect(appDefineCallback.calls.count()).toBe 1

      it 'NBLOCK_DEFINE should be trigger', ->
        blockDefineCallback = jasmine.createSpy 'NBLOCK_DEFINE'
        _n.on 'NBLOCK_DEFINE', blockDefineCallback
        expect(blockDefineCallback.calls.count()).toBe 1

    describe 'off event >', ->
      offEventCallback = null
      offMultiEventCallback = null

      beforeAll ->
        _n.reset()
        offEventCallback = jasmine.createSpy 'offEventCallback'
        offMultiEventCallback = jasmine.createSpy 'offMultiEventCallback'

      afterAll ->
        offEventCallback = null
        offMultiEventCallback = null

      it 'off event', ->
        _n.on 'offEventTest', offEventCallback
        _n.trigger 'offEventTest'
        expect(offEventCallback.calls.count()).toBe 1
        _n.off 'offEventTest'
        _n.trigger 'offEventTest'
        expect(offEventCallback.calls.count()).toBe 1

      it 'off multi event', ->
        _n.on 'offMultiEvent1 offMultiEvent2', offMultiEventCallback
        _n.trigger 'offMultiEvent1'
        _n.trigger 'offMultiEvent2'
        expect(offMultiEventCallback.calls.count()).toBe 2
        _n.off 'offMultiEvent1 offMultiEvent2'
        _n.trigger 'offMultiEvent1'
        _n.trigger 'offMultiEvent2'
        expect(offMultiEventCallback.calls.count()).toBe 2
      # }}}

  describe 'router test >', -># {{{
    _n = ndoo
    regexp = ///
      ^(?:\/?)           # ^[/]
      (.*?)              # [:controller]
      (?:\/?([^/?#]+))    # /:action
      (?:\?(.*?))?       # [?:params]
      (?:\#(.*?))?$      # [#:hash]$
    ///

    routerCallback = jasmine.createSpy 'routerCallback'

    beforeEach ->
      routerCallback.calls.reset()

    it '"/index" and "index" should match action', ->
      matchText = 'index'
      matchResult = ['', 'index', undefined, undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/index?id=1" and "index?id=1" should match action, params', ->
      matchText = 'index?id=1'
      matchResult = ['', 'index', 'id=1', undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/home/index" and "home/index" should match controller, action', ->
      matchText = 'home/index'
      matchResult = ['home', 'index', undefined, undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/home/index?id=1" and "home/index?id=1" should match controller, action, params', ->
      matchText = 'home/index?id=1'
      matchResult = ['home', 'index', 'id=1', undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/user/home/index" and "user/home/index" should match namespace/controller, action', ->
      matchText = 'user/home/index'
      matchResult = ['user/home', 'index', undefined, undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/user/home/index?id=1" and "user/home/index?id=1" should match namespace/controller, action, params', ->
      matchText = 'user/home/index?id=1'
      matchResult = ['user/home', 'index', 'id=1', undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/ndoo/user/home/index" and "ndoo/user/home/index" should match namespace/controller, action, params', ->
      matchText = 'ndoo/user/home/index'
      matchResult = ['ndoo/user/home', 'index', undefined, undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/ndoo/user/home/index?id=1" and "ndoo/user/home/index?id=1" should match namespace/controller, action, params', ->
      matchText = 'ndoo/user/home/index?id=1'
      matchResult = ['ndoo/user/home', 'index', 'id=1', undefined]
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/index#top" and "index#top" should match action, hash', ->
      matchText = 'index#top'
      matchResult = ['', 'index', undefined, 'top']
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/home/index#top" and "home/index#top" should match controller, action, hash', ->
      matchText = 'home/index#top'
      matchResult = ['home', 'index', undefined, 'top']
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/index?id=1#top" and "index?id=1#top" should match action, params, hash', ->
      matchText = '/index?id=1#top'
      matchResult = ['', 'index', 'id=1', 'top']
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

    it '"/home/index?id=1#top" and "home/index?id=1#top" should match controller, action, params, hash', ->
      matchText = 'home/index?id=1#top'
      matchResult= ['home', 'index', 'id=1', 'top']
      _n.router.parse regexp, "/#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult
      _n.router.parse regexp, "#{matchText}", routerCallback
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult# }}}

  describe 'block test >', -># {{{
    _n = null

    beforeAll ->
      _n = ndoo

    beforeEach ->
      _n.reset()

    it 'check undefine block return undefined', ->
      expect(_n.hasBlock 'test').toBeUndefined()

    it 'get undefine block return undefined', ->
      expect(_n.block 'test').toBeUndefined()

    it 'marker block and check it', ->
      _n.on 'NBLOCK_DEFINE', ->
        _n.setBlock 'test'

      expect(_n.hasBlock 'test').toBeTruthy()

    it 'set block and get it', ->
      block = ->
      _n.block 'main.block1', block
      expect(_n.block 'main.block1').toBe block

    it 'block should be equal origin', ->
      class TestBlock
        @init: !->

      testBlock = new TestBlock()
      _n.block 'test.block', testBlock
      expect(_n.block 'test.block').toBe testBlock

    it 'block should be overwrite', ->
      block2 = new Object()
      _n.block 'main.block2', block2
      expect(_n.block 'main.block2').toBe block2

    it 'block should be call', ->
      testBlock = jasmine.createSpy()
      _n.block 'block.test', testBlock
      _n.init 'home/index'
      _n.initBlock {
        blockId: 'block/test'
        type: 'block'
      }
      expect(testBlock).toHaveBeenCalled()

    it 'block args should be set', ->
      argsBlock = jasmine.createSpy()
      _n.block 'block.args', argsBlock
      _n.initBlock {
        blockId: 'block/args?abc=1'
        type: 'block'
      }
      expect(argsBlock.calls.mostRecent().args[1]).toBe 'abc=1'

    it 'block init should be call', ->
      objectBlock = jasmine.createSpyObj 'objectBlock', ['init', 'test']
      _n.block 'block.objectInit', objectBlock
      _n.initBlock {
        blockId: 'block/objectInit'
        type: 'block'
      }
      expect(objectBlock.init).toHaveBeenCalled()

    it 'object block args should be set', ->
      objectBlock = jasmine.createSpyObj 'objectBlockArgs', ['init', 'test']
      _n.block 'block.objectArgs', objectBlock
      _n.initBlock {
        blockId: 'block/objectArgs?abc=1'
        type: 'block'
      }
      # console.log objectBlock.init.calls.mostRecent().args
      expect(objectBlock.init.calls.mostRecent().args[1]).toBe 'abc=1'

    it 'failure set block to false value', ->
      result = _n.block 'block/falseVaule', 0
      expect(result).toBeFalsy()

    it 'set block no function or object return false', ->
      result = _n.block 'block/errorType', true
      expect(result).toBeFalsy()

    it 'set block should be return it', ->
      returnBlock = jasmine.createSpyObj 'objectBlockReturn', ['init', 'test']
      result = _n.block 'block/returnBlock', returnBlock
      expect(result).toBe returnBlock

    # }}}

  describe 'service test >', -># {{{
    _n = null

    beforeAll ->
      _n = ndoo

    beforeEach ->
      _n.reset()

    it 'get undefined service should return falsy', ->
      expect(_n.service 'testService').toBeFalsy()

    it 'set service should return it', ->
      service = { test: true }

      _n.service 'testService', service
      expect(_n.service 'testService').toBe service

    it 'set value should return it', ->
      service = 'serivce'
      _n.service 'testValueService', service
      expect(_n.service 'testValueService').toBe service

    it 'set false should return it', ->
      service = false
      _n.service 'testFalseValueService', service
      expect(_n.service 'testFalseValueService').toBe service
      nullService = null
      _n.service 'testNullValueService', nullService
      expect(_n.service 'testNullValueService').toBe nullService
      undefinedService = undefined
      _n.service 'testUndefinedValueService', undefinedService
      expect(_n.service 'testUndefinedValueService').toBe undefinedService

    it 'init method should be call', ->
      initMethod = jasmine.createSpy 'initMethod'
      service =
        init: initMethod

      _n.service 'testInitMethod', service
      _n.service 'testInitMethod'
      expect(initMethod).toHaveBeenCalled()

    it 'service instance should be equal', ->
      _n.service 'testSingleton', do ->
        service = ->
          @

        init: ->
          unless @instance
            @instance = new service

          @instance

      serviceInstance = _n.service 'testSingleton'
      expect(_n.service 'testSingleton').toBe serviceInstance

    it 'service factory not be equal', ->
      _n.service 'testFactory', do ->
        service = ->
          @

        init: ->
          new service()

      prevInstance = _n.service 'testFactory'
      expect(_n.service 'testFactory').not.toBe prevInstance

    it 'set service should be return it', ->
      testService = new Object()
      result = _n.service 'testServiceResult', testService
      expect(result).toBe testService

    it 'set false value should be exist', ->
      result = _n.service 'testFalseService', false
      expect(_n._blockData['_exist']["service._default.testFalseService"]).toBeTruthy()

    # }}}

  describe 'ndoo app test >', -># {{{
    describe 'home/index action test >', -># {{{
      _n = null
      indexAction = null

      beforeEach ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy('indexAction')

        _n.app 'home',
          indexAction: indexAction

      afterEach ->
        _n = null
        indexAction = null

      it 'has app home', ->
        expect(_n.app 'home').toBeTruthy()

      it 'index action should be call', ->
        _n.init 'home/index'
        expect(indexAction).toHaveBeenCalled()

      it 'action param should be set', ->
        _n.init 'home/index?abc=1#abc'
        expect(indexAction.calls.argsFor(0)).toEqual(['abc=1'])# }}}

    describe 'app set behavior >', -># {{{
      _n = null
      app = null

      beforeEach ->
        _n = ndoo
        _n.reset()
        app = {
          indexAction: jasmine.createSpy('indexAction')
        }

        _n.app 'home', app

      afterEach ->
        _n = null
        app = null

      it 'first set app should be equal', ->
        home = _n.app 'home'
        expect(home).toBe app

      it 'second app should be merge', ->
        testAction = jasmine.createSpy('testAction')
        _n.app 'home',
          testAction: testAction

        home = _n.app 'home'

        _n.init 'home/test'
        expect(testAction).toHaveBeenCalled()

      it 'set app null should be return false', ->
        result = _n.app 'home', null
        expect(result).toBeFalsy()# }}}

    describe 'home/index before and after test >', -># {{{
      _n = null
      indexAction = null
      indexBefore = null
      indexAfter = null

      beforeAll ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy 'indexAction'
        indexBefore = jasmine.createSpy 'indexBefore'
        indexAfter  = jasmine.createSpy 'indexAfter'
        _n.app 'home', {indexAction, indexBefore, indexAfter}
        _n.init 'home/index'

      afterAll ->
        _n = null
        indexAction = indexBefore = indexAfter = null

      it 'before should be call', ->
        expect(indexBefore).toHaveBeenCalled()

      it 'after should be call', ->
        expect(indexAfter).toHaveBeenCalled()# }}}

    describe 'filter test >', -># {{{
      _n = null
      indexAction = null
      indexBeforeFilter = null
      indexAfterFilter = null

      beforeAll ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy 'indexAction'
        indexBeforeFilter = jasmine.createSpy 'indexBeforeFilter'
        indexAfterFilter = jasmine.createSpy 'indexAfterFilter'

        _n.app 'home',
          before:
            filter: 'indexBefore'
          after:
            filter: 'indexAfter'
          indexBeforeFilter: indexBeforeFilter
          indexAfterFilter: indexAfterFilter
          indexAction: indexAction

        _n.init 'home/index'

      afterAll ->
        _n = null

      it 'before filter should be call', ->
        expect(indexBeforeFilter).toHaveBeenCalled()

      it 'after filter should be call', ->
        expect(indexAfterFilter).toHaveBeenCalled()# }}}

    describe 'filter modfifier test >', -># {{{
      _n = null
      indexAction = null
      listAction = null
      detailAction = null
      onlyIndexFilter = null
      exceptIndexFilter = null

      beforeEach ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy 'indexAction'
        listAction = jasmine.createSpy 'listAction'
        detailAction = jasmine.createSpy 'detailAction'
        onlyIndexFilter = jasmine.createSpy 'onlyIndexFilter'
        exceptIndexFilter = jasmine.createSpy 'exceptIndexFilter'

        _n.app 'home',
          before: [
            {filter: 'onlyIndex', only: 'index'},
            {filter: 'exceptIndex', except: 'index'}
          ]
          onlyIndexFilter: onlyIndexFilter
          exceptIndexFilter: exceptIndexFilter
          indexAction: indexAction
          listAction: listAction
          detailAction: detailAction

      afterEach ->
        _n = null
        indexAction = null
        listAction = null
        detailAction = null
        onlyIndexFilter = null
        exceptIndexFilter = null

      it 'only index filter should be call on home/index', ->
        _n.init 'home/index'
        expect(onlyIndexFilter).toHaveBeenCalled()

      it 'only index filter dont call on home/list', ->
        _n.init 'home/list'
        expect(onlyIndexFilter).not.toHaveBeenCalled()

      it 'except index filter dont call on home/index', ->
        _n.init 'home/index'
        expect(exceptIndexFilter).not.toHaveBeenCalled()

      it 'except index filter should be call on home/list', ->
        _n.init 'home/list'
        expect(exceptIndexFilter).toHaveBeenCalled()# }}}

    describe 'test multi filter >', -># {{{
      _n = null
      indexAction = null
      firstFilter = null
      secondFilter = null

      beforeEach ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy 'indexAction'
        firstFilter = jasmine.createSpy 'firstFilter'
        secondFilter = jasmine.createSpy 'secondFilter'


      afterEach ->
        _n = null
        indexAction = null
        firstFilter = null
        secondFilter = null

      it 'first and second should be call', ->
        _n.app 'home',
          before: { filter: 'first second' }
          firstFilter: firstFilter
          secondFilter: secondFilter
          indexAction: indexAction

        _n.init 'home/index'
        expect(firstFilter).toHaveBeenCalled()
        expect(secondFilter).toHaveBeenCalled()

      it 'first and second should be call', ->
        _n.app 'home',
          before: [
            { filter: 'first' }
            { filter: 'second' }
          ]
          firstFilter: firstFilter
          secondFilter: secondFilter
          indexAction: indexAction

        _n.init 'home/index'
        expect(firstFilter).toHaveBeenCalled()
        expect(secondFilter).toHaveBeenCalled()# }}}

    describe 'test app depend >', -># {{{
      _n = null
      requireSpy = null
      indexAction = null
      listAction = null
      requireBak = null
      dependTemp = []

      requireMock = (depend, callback, type) ->
        dependTemp = depend
        callback()

      beforeEach ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy 'indexAction'

        requireBak = _n.require
        _n.require = requireMock

      afterEach ->
        dependTemp = []
        _n.require = requireBak

      it 'depend should be set', ->
        _n.app 'home',
          depend: 'homeAppDepend',
          indexAction: indexAction

        _n.init 'home/index'
        expect(dependTemp).toBeTruthy()

      it 'depend should equal "homeAppDepend"', ->
        _n.app 'home',
          depend: 'homeAppDepend',
          indexAction: indexAction

        _n.init 'home/index'
        expect(dependTemp).toEqual ['homeAppDepend']

      it 'action depend should be set', ->
        _n.app 'home',
          indexDepend: 'indexDepend'
          indexAction: indexAction

        _n.init 'home/index'
        expect(dependTemp.length).toBeTruthy()

      it 'action depend should equal "indexDepend"', ->
        _n.app 'home',
          indexDepend: 'indexDepend'
          indexAction: indexAction

        _n.init 'home/index'
        expect(dependTemp).toEqual ['indexDepend']

      it 'app and action depend should be set', ->
        _n.app 'home',
          depend: 'homeAppDepend'
          indexDepend: 'indexDepend'
          indexAction: indexAction

        _n.init 'home/index'
        expect(dependTemp).toEqual ['homeAppDepend', 'indexDepend']

      it 'init string depend should be set', ->
        _n.app 'home', {indexAction}

        _n.init 'home/index', 'homeAppDepend'
        expect(dependTemp).toEqual ['homeAppDepend']

      it 'init depend should be set', ->
        _n.app 'home', {indexAction}

        _n.init 'home/index', ['homeAppDepend']
        expect(dependTemp).toEqual ['homeAppDepend']

      it 'init multi depend should be get', ->
        _n.app 'home', {indexAction}
        _n.init 'home/index', ['homeAppDepend', 'indexDepend']
        expect(dependTemp).toEqual ['homeAppDepend', 'indexDepend']

      # }}}

    describe 'test module event', -> #{{{
      _n = null
      indexAction = null
      beforeCall = null
      afterCall = null

      beforeEach ->
        _n = ndoo
        _n.reset()
        indexAction = jasmine.createSpy 'indexAction'
        beforeCall = jasmine.createSpy 'beforeCall'
        afterCall = jasmine.createSpy 'afterCall'

      afterEach ->
        indexAction = null
        beforeCall = null
        afterCall = null
        _n = null

      it 'moudle before should be call', ->
        _n.app 'home',
          indexAction: indexAction

        _n.on 'NAPP_HOME_ACTION_BEFORE', beforeCall
        _n.init 'home/index'

        expect(beforeCall).toHaveBeenCalled()

      it 'module after should be call', ->
        _n.app 'home',
          indexAction: indexAction

        _n.on 'NAPP_HOME_ACTION_AFTER', afterCall
        _n.init 'home/index'

        expect(afterCall).toHaveBeenCalled()

      it 'app before should be call', ->
        _n.app 'home',
          indexAction: indexAction

        _n.on 'NAPP_ACTION_BEFORE', beforeCall
        _n.init 'home/index'

        expect(beforeCall).toHaveBeenCalled()# }}}
    # }}}

  #}}}

# vim: set sw=2 ts=2 sts=2 fdm=marker et:
