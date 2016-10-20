/*
" --------------------------------------------------
"   FileName: ndoo_lib_depend.ls
"       Desc: ndoo.js库依赖文件
"     Author: chenglf
"    Version: 1.0.0
" LastChange: 10/19/2016 11:11
" --------------------------------------------------
*/

"use strict"
_  = @[\_]

@N = @ndoo ||= {}
_n = @ndoo

_lib = _n._lib

$ = @[\jQuery] or @[\Zepto]
``_.extend(_lib, _);``
_lib.extend _lib, do
  onready: (callback) !->
    if $
      $ callback
    else if window.addEventListener
      document.addEventListener \DOMContentLoaded, callback, false

  onload: (callback) !->
    if $
      $ window .on \load, callback
    else if window.addEventListener
      addEventListener \load, callback, false

  querySelector: (selector) ->
    if $
      $ selector .slice 0
    else if document.querySelectorAll
      document.querySelectorAll selector

  data: (elem, key, value) ->
    type = arguments.length
    if $
      if type is 2
        $(elem).data(key)
      else if type is 3
        $(elem).data(key, value);
    else
      unless elem.dataset
        key = key.replace /([A-Z])/g, (char) -> '-'+char.toLowerCase!

      if type is 2
        if elem.dataset
          elem.dataset[key]
        else
          elem.getAttribute(key)
      else if type is 3
        if elem.dataset
          elem.dataset[key] = value
        else
          elem.setAttribute(key, value)
