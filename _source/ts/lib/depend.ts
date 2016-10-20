export let onready = function (callback: EventListener) {
  document.addEventListener('DOMContentLoaded', callback, false);

}
export let onload = function (callback: EventListener) {
  addEventListener('load', callback, false);
}
export let querySelector = function (selector: any) {
  document.querySelectorAll(selector);
}
export let data = function (elem: HTMLElement, key: string, value?: any) {
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