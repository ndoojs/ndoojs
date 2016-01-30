(function () {
  "use strict";
  this.N = this.ndoo || (this.ndoo = {});
  var _n = this.ndoo;

  var cleanEvent = function (e) {
    var eventHandle = e.eventHandle
    for (var key in eventHandle.listened) {
      if (key.indexOf('PAGE_') < 0
        && key.indexOf('NAPP_') < 0
        && key.indexOf('NBLOCK_') < 0) {
          console.log('clean listened: '+key);
          delete eventHandle.listened[key];
      }
    }
    // for (var key in eventHandle.events) {
    //   if (key.indexOf('PAGE_') < 0
    //     && key.indexOf('NAPP_') < 0
    //     && key.indexOf('NBLOCK_') < 0) {
    //       delete eventHandle.events[key];
    //   }
    // }
    eventHandle.events = {}
    for (var key in eventHandle._events) {
      if (key.indexOf('PAGE_') < 0
        && key.indexOf('NAPP_') < 0
        && key.indexOf('NBLOCK_') < 0) {
          console.log('clean _event: '+key);
          delete eventHandle._events[key];
      }
    }
    return e;
  }

  _n.reset = function () {
    // 清空变量暂存
    _n.vars = {}

    // 清空函数暂存
    _n.func = {}

    // 清空存储暂存
    _n.storage._data = {}

    // 清空block暂存
    _n._blockData = { _block: {}, _app: {}, _service: {}, _exist: {} }

    // 清空事件暂存
    _n.event._temp = [];

    // 清空事件具柄
    _n.event = cleanEvent(_n.event);
    // _n.event = _.extend(_n.event, {
    //   /* eventHandle {{{ */
    //   eventHandle: _.extend({
    //     events: {},
    //     listened: {}
    //   }, _n._lib.Events)
    // });

    // 清空page id
    _n.pageId = '';

    // 触发NAPP事件
    _n.trigger('STATUS:NAPP_DEFINE');

    // 触发NBLOCK事件
    if (_n.block) {
      _n.trigger('STATUS:NBLOCK_DEFINE')
    }

  };
}).call(this);
