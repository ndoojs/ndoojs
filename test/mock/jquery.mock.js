(function() {
  var fn = function (select) {
    return new (
      Function.bind.apply(
        fn.init,
        [null].concat(
          [].slice.call(arguments, 0)
        )
      )
    );
    // return new fn.init(select);
  }
  fn.init = function (args) {
    if (arguments == '[data-nblock-id]') {
      this.length = 0;
    }
    if (typeof args == 'object' && args.constructor == Function || typeof args  == 'function') {
      args();
    }

    this.args = args;

    this.data = function(key) {
      if (key === 'pageId') {
        return 'home/index';
      }
      else if (key == 'nblockId') {
        if (args && args.blockId) {
          return args.blockId
        }
      }
    }
    this.bind = function(event, call) {
      if (event == 'load') {
        call()
      }
    }
  }
  this.jQuery = this.$ = fn;
}).call(this);

/* vim: se sw=2 ts=2 sts=2 fdm=marker et: */
