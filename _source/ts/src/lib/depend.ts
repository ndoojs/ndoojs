/// <references src="../declare.d.ts" />
import * as jquery from 'jquery';
import * as zepto from 'zepto';

let $ = jquery || zepto;
let depend: any = {};
if ($) {
  depend.onready = function (callback: EventListener) {
    return $(callback);
  }
  depend.onload = function (callback: EventListener) {
    return $(window).on('load', callback);
  }
  depend.querySelector = function (selector: any) {
    return $(selector).get();
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
    return document.addEventListener('DOMContentLoaded', callback, false);
  }
  depend.onload = function (callback: EventListener) {
    return addEventListener('load', callback, false);
  }
  depend.querySelector = function (selector: any) {
    return document.querySelectorAll(selector);
  }
  depend.data = function (elem: HTMLElement, key: string, value?: any) {
    let setData: Function;
    let getData: Function;

    if (elem.dataset) {
      setData = (elem, key, value) => elem.dataset[key] = value;
      getData = (elem, key) => elem.dataset[key];
    }
    else {
      key = key.replace(/([A-Z])/g, (char) => '-' + char.toLocaleLowerCase());
      setData = (elem, key, value) => elem.setAttribute(key, value);
      getData = (elem, key) => elem.getAttribute(key);
    }

    if (arguments.length === 2) {
      return getData(elem, key);
    }
    else if (arguments.length === 3) {
      return setData(elem, key, value);
    }
  }
}

export let { onready, onload, querySelector, data } = depend;