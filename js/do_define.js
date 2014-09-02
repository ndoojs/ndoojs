(function(_n){
  var libPathBase, jsPathbase, ndooPathBase;
  libPathBase = '../lib';
  jsPathbase = '../js';
  ndooPathBase = '../js';
  Do.setConfig('autoLoad', false);
  Do.define('jquery', {
    path: libPathBase + "/jquery-2.1.1.min.js",
    type: 'js'
  });
  Do.setLoaded(['jquery']);
  Do.define('ndoo.app.test', {
    path: ndooPathBase + "/ndoo.app.test.js",
    type: 'js'
  });
  return _n.on('PAGE_APP_DEFINE', function(){
    _n.setApp('test');
  });
})(this.N = this.ndoo || (this.ndoo = {}));
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
