define(function(require, exports, module) {
    var $ = require('jquery-1.11.1.js');
    $.fn.mytest = function () {
        console.log($.version);
    }
});
