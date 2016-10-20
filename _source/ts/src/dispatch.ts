import { _lib } from './lib';
import * as _depend from './lib/depend';
import { on, trigger } from './event';
import { app, hasApp } from './app';
import { base, router } from './base';

export let pageId = '';
export let initPageId = function (id: string) {
  if (pageId) {
    return;
  }
  if (typeof document != 'undefined') {
    let el = document.getElementById(id || 'scriptArea');
    if (el) {
      pageId = el.getAttribute('data-page-id') || '';
    }
    if (!pageId && id) {
      pageId = id;
    }
  }
}

/* dispatch {{{ */
/**
 * 路由函数
 *
 * @private
 * @method
 * @name dispatch
 * @memberof ndoo
 */
/* }}} */
let filterHaldner = function (type: string, controller: any, actionName: string, params: string) {
  let data: any;
  if (type === 'before') {
    data = controller.before
  }
  else if (type === 'after') {
    data = controller.after;
  }
  if (!data) {
    return;
  }
  let _data: any[];
  if (typeof data === 'object') {
    _data = [].concat(data);
  }
  for (let dataItem of _data) {
    let _filter = dataItem.filter;
    if (!_lib.isArray(_filter)) {
      _filter = [].concat(_filter.split(/\s*,\s*|\s+/))
    }
    let isRun = true;
    if (dataItem.only) {
      let _only = dataItem.only;
      if (!_lib.isArray(_only)) {
        _only = [].concat(_only.split(/\s*,\s*|\s+/))
      }
      if (_lib.indexOf(_only, actionName) < 0) {
        isRun = false
      }
    }
    else if (dataItem.except) {
      let _except = dataItem.except;
      if (!_lib.isArray(_except)) {
        _except = [].concat(_except.split(/\s*,\s*|\s+/))
      }
      if (_lib.indexOf(_except, actionName) > -1) {
        isRun = false;
      }
    }
    if (isRun) {
      for (let filter of _filter) {
        controller[`${filter}Filter`](actionName, params);
      }
    }
  }
}
export let dispatch = function () {
  on(
    'NAPP_ACTION_BEFORE',
    (...data: any[]) => filterHaldner.apply(null, ['before'].concat(data))
  );
  on(
    'NAPP_ACTION_AFTER',
    (...data: any[]) => filterHaldner.apply(null, ['after'].concat(data))
  );
  on('NAPP_LOADED', function (ns: string, appName: string, actionName: string, params) {
    let appData: any;
    if (ns) {
      appData = app(`${ns}.${appName}`)
    }
    else {
      appData = app(appName)
    }

    if (!_lib.has(appData, `${actionName}Action`) 
      && _lib.has(appData, 'emptyAction')) {
        actionName = '_empty';
    }

    let depend = [];

    if (appData['depend']) {
      depend = depend.concat(appData['depend']);
    }

    if (appData[`${actionName}Depend`]) {
      depend = depend.concat(appData[`${actionName}Depend`]);
    }

    let filterPrefix = appName;
    if (ns) {
      filterPrefix = (`${ns}.${appName}`).replace(/\./g, '_')
    }
    filterPrefix = filterPrefix.toUpperCase();

    let run = function() {
      if (actionName) {
        trigger('NAPP_ACTION_BEFORE', appData, actionName, params);
        trigger(`NAPP_${filterPrefix}_ACTION_BEFORE`, appData, actionName, params);

        if (appData[`${actionName}Before`]) {
          appData[`${actionName}Before`](params);
        }
        if (appData[`${actionName}Action`]) {
          appData[`${actionName}Action`](params);
        }
        if (appData[`${actionName}After`]) {
          appData[`${actionName}After`](params);
        }

        trigger(`NAPP_${filterPrefix}_ACTION_AFTER`, appData, actionName, params);
        trigger('NAPP_ACTION_AFTER', appData, actionName, params);
      }
      trigger('STATUS:NBLOCK_INIT');
    }

    if (depend.length) {
      base.require(_lib.uniq(depend), run, 'Do');
    }
    else {
      run();
    }
  });
  on('PAGE_STATUS_ROUTING', function(data) {
    router.parse(
      /^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/,
      data, function(appName: string, actionName: string, params: string) {
      let nsmatch = appName.match(/(.*?)(?:[/.]([^/.]+))$/);
      let ns: string = '';
      if (nsmatch) {
        [, ns, appName] = nsmatch;
      }
      let pkg: string;
      if (ns) {
        ns = ns.replace(/\//g, '.');
        pkg = `${ns}.${appName}`;
      }
      else {
        pkg = appName;
      }

      if (app(pkg)) {
        trigger('NAPP_LOADED', ns, appName, actionName, params);
      }
      else if (hasApp(pkg)) {
        base.require([pkg], function() {
          trigger('NAPP_LOADED', ns, appName, actionName, params);
        }, 'Do');
      }
      else {
        trigger('STATUS:NBLOCK_INIT');
      }
    });
  });
}

export let triggerPageStatus = function(depend: string | string[]) {
  let call = () => {
    trigger('STATUS:PAGE_STATUS_FAST')

    _depend.onready(function () {
      trigger('STATUS:PAGE_STATUS_DOMPREP');
      trigger('STATUS:PAGE_STATUS_DOM');
      trigger('STATUS:PAGE_STATUS_DOMORLOAD');
    });

    _depend.onload(function() {
      trigger('STATUS:PAGE_STATUS_LOAD');
    });

    on('PAGE_STATUS_DOM', function() {
      if (pageId) {
        trigger('STATUS:PAGE_STATUS_ROUTING', pageId);
      }
    });
  }

  if (depend) {
    base.require([].concat(depend), call, 'Do');
  }
  else {
    call();
  }
}

export let init = function(id?: string | string[], depend?: string| string[]) {
  if (_lib.isArray(id)) {
    [id, depend] = ['', id];
  }

  initPageId(<string>id);
  dispatch();
  triggerPageStatus(depend);
  return this;
}