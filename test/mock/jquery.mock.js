(function() {
  var fn = function () {
    return new fn.init(
      [].slice.call(arguments, 1)
    );
  }
  fn.init = function (args) {
    if (arguments == '[data-nblock-id]') {
      this.length = 0;
    }
    if (typeof args  == 'function') {
      console.log(args);
      args();
    }
    this.data = function(key) {
      if (key === 'pageId') {
        return 'home/index';
      }
    }
    this.bind = function(event) {

    }
  }
  this.jQuery = this.$ = fn;
}).call(this);

/* vim: se sw=2 ts=2 sts=2 fdm=marker et: */
