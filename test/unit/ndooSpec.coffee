describe 'ndoo framework test', ->
  describe 'storage test', ->
    _stor = undefined

    beforeAll ->
      _stor = ndoo.storage

    it 'ndoo.storage should deinfe', ->
      expect(_stor).toBeDefined()

    it 'get abc, should be undefined', ->
      expect(_stor('abc')).toBeUndefined()

    describe 'set value', ->
      it 'set abc to 123, should be 123', ->
        expect(_stor('abc', 123)).toBe 123

      it 'get abc after set, should be 123 ', ->
        expect(_stor('abc')).toBe 123

    describe 'rewrite', ->
      it 'rewrite abc without option, should be false', ->
        expect(_stor('abc', 456)).toBe false
      it 'get abc after rewrite, should be 123', ->
        expect(_stor('abc')).toBe 123

      it 'rewrite abc add option, should be Truthy', ->
        expect(_stor 'abc', 456, _stor.REWRITE).toBeTruthy()
      it 'get abc after rewrite, should be 456', ->
        expect(_stor('abc')).toBe 456

    describe 'destroy', ->
      it 'remove abc for storage, should be true', ->
        expect(_stor('abc', null, _stor.DESTROY)).toBe true

      it 'get abc for storage, should be undefined', ->
        expect(_stor('abc')).toBeUndefined()
