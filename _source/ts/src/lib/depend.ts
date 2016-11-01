/// <references src="../declare.d.ts" />
import * as jquery from 'jquery';
import * as zepto from 'zepto';

let $ = jquery || zepto;
let depend: any = {};
if ($) {
  depend.onready = function (callback: EventListener) {
    $(callback);
  }
  depend.onload = function (callback: EventListener) {
    $(window).on('load', callback);
  }
  depend.querySelector = function (selector: any) {
    $(selector).slice(0);
  }
  depend.data = function (elem: HTMLElement, key: string, value: any) {
    if (arguments.length === 2) {
      return $(elem).data(key);
    }
    else if (arguments.length === 3) {
      return $(elem).data(key, value);
    }
  }
}
else {
  depend.onready = function (callback: EventListener) {
    document.addEventListener('DOMContentLoaded', callback, false);

  }
  depend.onload = function (callback: EventListener) {
    addEventListener('load', callback, false);
  }
  depend.querySelector = function (selector: any) {
    document.querySelectorAll(selector);
  }
  depend.data = function (elem: HTMLElement, key: string, value?: any) {
    if (!elem.dataset) {
      key = key.replace(/([A-Z])/g, (char) => '-' + char.toLocaleLowerCase());
    }
    if (arguments.length === 2) {
      if (elem.dataset) {
        return elem.dataset[key];
      }
      else {
        return elem.getAttribute(key);
      }
    }
    else if (arguments.length === 3) {
      if (elem.dataset) {
        elem.dataset[key] = value;
      }
      else {
        elem.setAttribute(key, value);
      }
    }
  }
}

export let { onready, onload, querySelector, data } = depend;