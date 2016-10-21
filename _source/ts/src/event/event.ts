import { _lib } from '../lib';
import { eventBase } from './base';
import { getTempData } from '../tempData';

let tempData = getTempData();

export const TYPE_ON = 1;
export const TYPE_TRIGGER = 2;
export let inited = false;
export const _temp = [];
export let eventHandle: {
  [key: string]: any;
  events: {
    [key: string]: any;
  };
  listened: {
    [key: string]: any;
  };
  on: (event: string, callback: Function) => void;
  trigger: (event: string, ...data: any[]) => void;
  off: (event: string) => void;
} = _lib.extend(eventBase, _lib.Events);

export let on = function(eventName: string, callback: Function) {
  eventHandle.on(eventName, callback);
  eventHandle.listened[eventName] = true;
  if (_lib.has(eventHandle.events, `STATUS:${eventName}`)) {
    callback.apply(eventHandle, eventHandle.events[`STATUS:${eventName}`]);
  }
  if (_lib.has(eventHandle.events, eventName)) {
    for (let item of eventHandle.events[eventName]) {
      callback.apply(eventHandle, item);
    }
  }
}

export let off = function(eventName: string) {
  eventHandle.off(eventName);
  delete eventHandle.listened[eventName];
  delete eventHandle.events[eventName];
}

export let trigger = function(eventName: string, eventType: string, data: any[]) {
  if (eventType === 'DEFAULT') {
    eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
  }
  else if (eventType === 'DELAY') {
    if (_lib.has(eventHandle.listened, eventName)) {
      eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
    }
    if (!_lib.has(eventHandle.events, eventName)) {
      eventHandle.events[eventName] = []
    }
    eventHandle.events[eventName].push(data);
  }
  else if (eventType === 'STATUS') {
    if (!_lib.has(eventHandle.events, `${eventType}:${eventName}`)) {
      eventHandle.events[`${eventType}:${eventName}`] = data;
      if (_lib.has(eventHandle.listened, eventName)) {
        eventHandle.trigger.apply(eventHandle, [eventName].concat(data));
      }
    }
  } 
}

let init = function() {
  if (!inited && tempData.use) {
    for (let item of tempData.eventTemp) {
      if (item.type === TYPE_ON) {
        on(item.eventName, item.callback);
      }
      else if (item.type === TYPE_TRIGGER) {
        trigger(item.eventName, item.eventTYpe, item.data);
      }
    }
    inited = true;
  }
}

init();