/*
" --------------------------------------------------
"   FileName: ndoo_lib_depend.ls
"       Desc: ndoo.js库依赖文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 11:11
" --------------------------------------------------
*/
(function(){
  "use strict";
  var _, _n, _lib, $;
  _ = this['_'];
  this.N = this.ndoo || (this.ndoo = {});
  _n = this.ndoo;
  _lib = _n._lib;
  $ = this['jQuery'] || this['Zepto'];
  _.extend(_lib, {
    onready: function(callback){
      if ($) {
        $(callback);
      } else if (window.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback, false);
      }
    },
    onload: function(callback){
      if ($) {
        $(window).on('load', callback);
      } else if (window.addEventListener) {
        addEventListener('load', callback, false);
      }
    },
    querySelector: function(selector){
      if ($) {
        return $(selector).slice(0);
      } else if (document.querySelectorAll) {
        return document.querySelectorAll(selector);
      }
    },
    data: function(elem, key, value){
      if (!elem.dataset) {
        key = key.replace(/([A-Z])/g, function(char){
          return '-' + char.toLowerCase();
        });
      }
      if (arguments.length === 2) {
        if (elem.dataset) {
          return elem.dataset[key];
        } else {
          return elem.getAttribute(key);
        }
      } else if (arguments.length === 3) {
        if (elem.dataset) {
          return elem.dataset[key] = value;
        } else {
          return elem.setAttribute(key, value);
        }
      }
    }
  });
}).call(this);
