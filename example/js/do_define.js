(function(_n){
  var libPathBase, jsPathbase, currLibPath, currJsPath, ndooPathBase;
  libPathBase = '../lib';
  jsPathbase = '../js';
  currLibPath = 'lib';
  currJsPath = 'js';
  ndooPathBase = '../js';
  Do.setConfig('autoLoad', false);
  Do.define('jquery', {
    path: jsPathbase + "/jquery-2.1.1.min.js",
    type: 'js'
  });
  Do.setLoaded(['jquery']);
  Do.define('ndoo.test', {
    path: currJsPath + "/ndoo.app.test.js",
    type: 'js'
  });
  _n.on('NAPP_DEFINE', function(){
    _n.setApp('ndoo.test');
  });
  Do.define('test.main', {
    path: currJsPath + "/ndoo.block.test.js",
    type: 'js'
  });
  return _n.on('NBLOCK_DEFINE', function(){
    _n.setBlock('test.main');
  });
})(this.N = this.ndoo || (this.ndoo = {}));
/* vim: se ts=2 sts=2 sw=2 fdm=marker cc=80 et: */
