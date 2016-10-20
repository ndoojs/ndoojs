/// <references src="../declare.d.ts" />
import * as $ from '$';

export let onready = function (callback: EventListener) {
  $(callback);
}
export let onload = function (callback: EventListener) {
  $(window).on('load', callback);
}
export let querySelector = function (selector: any) {
  $(selector).slice(0);
}
export let data = function (elem: HTMLElement, key: string, value: any) {
  if (arguments.length === 2) {
    $(elem).data(key);
  }
  else if (arguments.length === 3) {
    $(elem).data(key, value);
  }
}