describe 'ndoo framework test >', ->
  describe 'storage test >', ->
    _stor = undefined

    beforeAll ->
      ndoo.reset()
      _stor = ndoo.storage

    it 'ndoo.storage should deinfe', ->
      expect(_stor).toBeDefined()

    it 'get abc, should be undefined', ->
      expect(_stor('abc')).toBeUndefined()

    describe 'set value >', ->
      it 'set abc to 123, should be 123', ->
        expect(_stor('abc', 123)).toBe 123

      it 'get abc after set, should be 123 ', ->
        expect(_stor('abc')).toBe 123

    describe 'rewrite >', ->
      it 'rewrite abc without option, should be false', ->
        expect(_stor('abc', 456)).toBe false
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
        expect(_stor('abc')).toBeUndefined()

  describe 'block test >', ->
    _n = null
    beforeAll ->
      _n = ndoo
      _n.reset()

    it 'has block should false', ->
      expect(_n.hasBlock 'test').toBeUndefined()

    it 'get block should false', ->
      expect(_n.block 'test').toBe false

  describe 'getPk test >', ->
    _n = null

    beforeAll ->
      _n = ndoo
      _n.reset()

    it 'getPk should match num', ->
      expect(_n.getPk()).toMatch /^\d+$/

    it 'getPk should prefix', ->
      expect(_n.getPk('test_')).toMatch /^test_\d+$/

  describe 'page id test >', ->
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
        expect(_n.pageId).toBe 'home/index'

  describe 'event test >', ->
    _n = null

    beforeAll ->
      _n = ndoo
      _n.reset()
      _n.init 'home/index'

    describe 'default event >', ->
      defaultEvent1 = jasmine.createSpy 'defaultEvent1'

      it 'defaultEvent1 not be call', ->
        _n.on 'defaultTest', defaultEvent1
        expect(defaultEvent1).not.toHaveBeenCalled()

      it 'trigger event default event should be call', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1).toHaveBeenCalled()

      it 'again trigger default event call count should be 2', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1.calls.count()).toEqual 2

    describe 'delay event >', ->
      delayEvent1 = jasmine.createSpy 'delayEvent1'

      it 'before event callback should be call', ->
        _n.trigger 'DELAY:delayTest', 'trigger 1'
        _n.on 'delayTest', delayEvent1
        expect(delayEvent1).toHaveBeenCalled()

      it 'again trigger, event callback call count should be 2', ->
        _n.trigger 'DELAY:delayTest', 'trigger 2'
        # console.log _n.event.eventHandle.events['delayTest']
        expect(delayEvent1.calls.count()).toEqual 2

      it 'again bind callback call count should be 2', ->
        delayEvent2 = jasmine.createSpy 'delayEvent2'
        _n.on 'delayTest', delayEvent2
        expect(delayEvent2.calls.count()).toEqual 2

      xit 'return false again bind should not call', ->
        delayEvent3 = jasmine.createSpy('delayEvent3').and.returnValue false
        delayEvent4 = jasmine.createSpy 'delayEvent4'
        _n.trigger 'DELAY:delayTest2'
        _n.on 'delayTest2', delayEvent3
        _n.on 'delayTest2', delayEvent4
        expect(delayEvent3).toHaveBeenCalled()
        expect(delayEvent4).not.toHaveBeenCalled()

    describe 'status event >', ->
      statusEvent1 = jasmine.createSpy 'statusEvent1'
      statusEvent2 = jasmine.createSpy 'statusEvent2'

      it 'before status event should be call', ->
        _n.on 'statusTest', statusEvent1
        _n.trigger 'STATUS:statusTest'
        expect(statusEvent1).toHaveBeenCalled()

      it 'before status event call count should be 1', ->
        expect(statusEvent1.calls.count()).toEqual 1

      it 'after status should be call', ->
        _n.on 'statusTest', statusEvent2
        expect(statusEvent2).toHaveBeenCalled()

      it 'again trigger status event call count should be 1', ->
        _n.trigger 'STATUS:statusTest'
        expect(statusEvent1.calls.count()).toEqual 1

      it 'NAPP_DEFINE should be trigger', ->
        appDefineCallback = jasmine.createSpy 'NAPP_DEFINE'
        _n.on 'NAPP_DEFINE', appDefineCallback
        expect(appDefineCallback.calls.count()).toEqual 1

      it 'NBLOCK_DEFINE should be trigger', ->
        blockDefineCallback = jasmine.createSpy 'NBLOCK_DEFINE'
        _n.on 'NBLOCK_DEFINE', blockDefineCallback
        expect(blockDefineCallback.calls.count()).toEqual 1

    describe 'off event >', ->
      offEventCallback = jasmine.createSpy 'offEventCallback'
      offMultiEventCallback = jasmine.createSpy 'offMultiEventCallback'

      it 'off event', ->
        _n.on 'offEventTest', offEventCallback
        _n.trigger 'offEventTest'
        expect(offEventCallback.calls.count()).toEqual 1
        _n.off 'offEventTest'
        _n.trigger 'offEventTest'
        expect(offEventCallback.calls.count()).toEqual 1

      it 'off multi event', ->
        _n.on 'offMultiEvent1 offMultiEvent2', offMultiEventCallback
        _n.trigger 'offMultiEvent1'
        _n.trigger 'offMultiEvent2'
        expect(offMultiEventCallback.calls.count()).toEqual 2
        _n.off 'offMultiEvent1 offMultiEvent2'
        _n.trigger 'offMultiEvent1'
        _n.trigger 'offMultiEvent2'
        expect(offMultiEventCallback.calls.count()).toEqual 2

  describe 'router test >', ->
    _n = ndoo
    regexp = ///
      ^(?:\/?)           # ^[/]
      (.*?)              # [:controller]
      (?:\/?([^/?#]+))    # /:action
      (?:\?(.*?))?       # [?:params]
      (?:\#(.*?))?$      # [#:hash]$
    ///
    routerCallback = jasmine.createSpy 'routerCallback'

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
      expect(routerCallback.calls.mostRecent().args).toEqual matchResult

  describe 'ndoo app test >', ->
    describe 'home/index action test >', ->
      _n = null
      indexAction = null

      beforeAll ->
        _n = ndoo
        indexAction = jasmine.createSpy('indexAction')

        _n.app 'home',
          indexAction: indexAction

      afterAll ->
        _n = null
        _n.reset()
        indexAction = null

      it 'has app home', ->
        expect(_n.app 'home').toBeTruthy()

      it 'initPageId should be call', ->
        _n.init 'home/index'
        expect(indexAction).toHaveBeenCalled()

    describe 'home/index before and after test >', ->
      _n = null
      indexAction = null
      indexBefore = null
      indexAfter = null

      beforeAll ->
        _n = ndoo
        indexAction = jasmine.createSpy 'indexAction'
        indexBefore = jasmine.createSpy 'indexBefore'
        indexAfter  = jasmine.createSpy 'indexAfter'
        _n.app 'home', {indexAction, indexBefore, indexAfter}
        _n.init 'home/index'

      afterAll ->
        _n.reset()
        _n = null
        indexAction = indexBefore = indexAfter = null

      it 'before should be call', ->
        expect(indexBefore).toHaveBeenCalled()

      it 'after should be call', ->
        expect(indexAfter).toHaveBeenCalled()

    describe 'filter test >', ->
      _n = null
      indexAction = null
      indexBeforeFilter = null
      indexAfterFilter = null

      beforeAll ->
        _n = ndoo
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
        _n.reset()
        _n = null

      it 'before filter should be call', ->
        expect(indexBeforeFilter).toHaveBeenCalled()

      it 'after filter should be call', ->
        expect(indexAfterFilter).toHaveBeenCalled()

    describe 'filter modfifier test >', ->
      _n = null
      indexAction = null
      listAction = null
      detailAction = null
      onlyIndexFilter = null
      exceptIndexFilter = null

      beforeEach ->
        _n = ndoo
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
        _n.reset()
        _n = null
        indexAction = null
        listAction = null
        detailAction = null
        onlyIndexFilter = null
        exceptIndexFilter = null

      it 'only index filter shoud be call on home/index', ->
        _n.init 'home/index'
        expect(onlyIndexFilter).toHaveBeenCalled()

      it 'only index filter dont call on home/list', ->
        _n.init 'home/list'
        expect(onlyIndexFilter).not.toHaveBeenCalled()

      it 'except index filter dont call on home/index', ->
        _n.init 'home/index'
        expect(exceptIndexFilter).not.toHaveBeenCalled()

      it 'except index filter shoud be call on home/list', ->
        _n.init 'home/list'
        expect(exceptIndexFilter).toHaveBeenCalled()

    describe 'test multi filter >', ->
      _n = null
      indexAction = null
      firstFilter = null
      secondFilter = null

      beforeEach ->
        _n = ndoo
        indexAction = jasmine.createSpy 'indexAction'
        firstFilter = jasmine.createSpy 'firstFilter'
        secondFilter = jasmine.createSpy 'secondFilter'


      afterEach ->
        _n.reset()
        _n = null
        indexAction = null
        firstFilter = null
        secondFilter = null

      it 'first and second shoud be call', ->
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
        expect(secondFilter).toHaveBeenCalled()

    describe 'test app depend >', ->
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
        indexAction = jasmine.createSpy 'indexAction'

        requireBak = _n.require
        _n.require = requireMock

      afterEach ->
        dependTemp = []
        _n.require = requireBak
        _n.reset()

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
