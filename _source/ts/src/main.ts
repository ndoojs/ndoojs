import { Prep } from './prep';
import { Storage } from './storage';
import { Router } from './router';
import { getPrepData, removePrepData } from './prepData';
let prepData = getPrepData();

export class Main extends Prep {  
  public pageId: string = '';
  public initPageId(id: string) {
    if (this.pageId) {
      return;
    }
    if (typeof document != 'undefined') {
      let el = document.getElementById(id || 'scriptArea');
      if (el) {
        this.pageId = el.getAttribute('data-page-id') || '';
      }
      if (!this.pageId && id) {
        this.pageId = id;
      }
    }
  }
  private _pk: number = +new Date();
  public getPk(prefix: string = '') {
    return `${prefix}${++this._pk}`;
  }
  public storage: typeof Storage = Storage;
  public router: typeof Router = Router;
  public require(depend: any[], callback: Function, type: string): void {
    if (type.toLocaleLowerCase() == 'do') {
      Do.apply(null, depend.concat(callback));
    }
    else if (type.toLocaleLowerCase() == 'seajs') {
      seajs.use(depend, callback);
    }
  }
  public _blockData = {
    _block: {},
    _app: {},
    _service: {},
    _exist: {}
  }
  public _block(base: string, ns: string, name: string, block?: any) {
    let data: any;
    let nsArr: string[];
    if (base == 'block' || base == 'app' || base == 'service') {
      data = this._blockData[`_${base}`];
    }
    else {
      return false;
    }

    if (ns) {
      nsArr = ns.replace(/^[/.]|[/.]$/g, '').split(/[/.]/);
    }
    else {
      nsArr = [];
    }

    let temp = data;
    let result: any;
    let success: boolean;
    if (block || arguments.length > 3) {
      for (let ns in nsArr) {
        temp = temp[ns] || (temp[ns] = {});
      }
      // app/block只允许真值
      if (block && (base === 'app' || base === 'block')) {
        if (typeof block === 'object') {
          if (base === 'app' && temp[name]) {
            result = this._lib.defaults(temp[name], block);
          }
          else {
            result = temp[name] = block;
          }
        }
        else if (typeof block === 'function') {
          result = temp[name] = block;
        }
        else {
          result = false;
        }
      }
      else if (base == 'service') {
        result = temp[name] = block;
        success = true;
      }
      else {
        result = false;
      }

      if (result || success) {
        if (ns) {
          this._blockData._exist[`${base}.${ns}.${name}`] = true;
        }
        else {
          this._blockData._exist[`${base}.${name}`] = true;
        }
      }

      return result;
    }
    else {
      for (let ns in nsArr) {
        if (!this._lib.has(temp, ns)) {
          return undefined;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  }
  hasApp(ns: string) {
    return this._blockData._exist[`app.${ns}`]
  }
  setApp(ns: string) {
    return this._blockData._exist[`app.${ns}`] = true;
  }
  app(ns: string, app?: any) {
    let nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
    let appName: string;
    if (!nsmatch) {
      nsmatch = [, null, ns]
    }
    [, ns, appName] = nsmatch;

    if (arguments.length > 1) {
      return this._block('app', ns, appName, app);
    }
    else {
      return this._block('app', ns, appName);
    }
  }
  _blockExist(ns: string, set: boolean = false) {
    let nsmatch: string[] = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
    let name: string;
    if (!nsmatch) {
      nsmatch = [, '_default', ns];

    }
    [, ns, name] = nsmatch;
    if (set) {
      return this._blockData._exist[`block.${ns}.${name}`] = true;
    }
    else {
      return this._blockData._exist[`block.${ns}.${name}`]
    }
  }
  hasBlock(ns: string) {
    return this._blockExist(ns);
  }
  setBlock(ns: string) {
    return this._blockExist(ns, true);
  }
  block(ns: string, block?: any) {
    let nsmatch: string[] = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
    let name: string;
    if (!nsmatch) {
      nsmatch = [, 'default', ns];
    }
    [ns, name] = nsmatch;
    if (arguments.length > 1) {
      return this._block('block', ns, name, block);
    }
    else {
      return this._block('block', ns, name);
    }
  }
  initBlock(elem: HTMLElement) {
    let {_lib, router} = this;
    let blockId: string | string[] = _lib.data(elem, 'nblockId');
    blockId = (<string>blockId).split(/\s*,\s*|\s+/);

    let _call = (blockId: string) => {
      router.parse(
        /^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/,
        blockId, (ns: string, blockName: string, params: string) => {
          ns = ns.replace(/\//g, '.');
          let pkg: string = `${ns}.${blockName}`;
          if (this.block(pkg)) {
            this.trigger('NBLOCK_LOADED', elem, ns, blockName, params);
          }
          else if (this.hasBlock(pkg)) {
            this.require([`${ns}.${blockName}`], () => {
              this.trigger('NBLOCK_LOADED', elem, ns, blockName, params);
            }, 'Do');
          }
        });
    }
    _lib.each(blockId, (id: string) => {
      let _self = this;
      _call.call(_self, id);
    });
  }
  service(ns: string, service: any) {
    let nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
    let name: string;

    if (!nsmatch) {
      nsmatch = [, '_default', ns];
    }
    [, ns, name] = nsmatch;

    if (arguments.length > 1) {
      return this._block('service', ns, name, service);
    }
    else {
      service = this._block('service', ns, name);
      if (service && this._lib.isFunction(service.init)) {
        return service.init();
      }
      else {
        return service
      }
    }
  }
  
  dispatch() {
    let {  _lib } = this;
    let filterHaldner = (type: string, controller: any, actionName: string, params: string) => {
      let data: any;
      let { _lib } = this;
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
    let _self = this;
    this.on(
      'NAPP_ACTION_BEFORE',
      (...data: any[]) => filterHaldner.apply(null, ['before'].concat(data))
    );
    this.on(
      'NAPP_ACTION_AFTER',
      (...data: any[]) => filterHaldner.apply(null, ['after'].concat(data))
    );
    this.on('NAPP_LOADED', (ns: string, appName: string, actionName: string, params) => {
      let appData: any;
      if (ns) {
        appData = this.app(`${ns}.${appName}`)
      }
      else {
        appData = this.app(appName)
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

      let run = () => {
        if (actionName) {
          this.trigger('NAPP_ACTION_BEFORE', appData, actionName, params);
          this.trigger(`NAPP_${filterPrefix}_ACTION_BEFORE`, appData, actionName, params);

          if (appData[`${actionName}Before`]) {
            appData[`${actionName}Before`](params);
          }
          if (appData[`${actionName}Action`]) {
            appData[`${actionName}Action`](params);
          }
          if (appData[`${actionName}After`]) {
            appData[`${actionName}After`](params);
          }

          this.trigger(`NAPP_${filterPrefix}_ACTION_AFTER`, appData, actionName, params);
          this.trigger('NAPP_ACTION_AFTER', appData, actionName, params);
        }
        this.trigger('STATUS:NBLOCK_INIT');
      }

      if (depend.length) {
        this.require(_lib.uniq(depend), run, 'Do');
      }
      else {
        run();
      }
    });
    this.on('PAGE_STATUS_ROUTING', (data) => {
      this.router.parse(
        /^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/,
        data, (appName: string, actionName: string, params: string) => {
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

        if (this.app(pkg)) {
          this.trigger('NAPP_LOADED', ns, appName, actionName, params);
        }
        else if (this.hasApp(pkg)) {
          this.require([pkg], function() {
            this.trigger('NAPP_LOADED', ns, appName, actionName, params);
          }, 'Do');
        }
        else {
          this.trigger('STATUS:NBLOCK_INIT');
        }
      });
    });
  }
  triggerPageStatus = function(depend: string | string[]) {
    let { _lib } = this;
    let call = () => {
      this.trigger('STATUS:PAGE_STATUS_FAST')

      _lib.onready(() => {
        this.trigger('STATUS:PAGE_STATUS_DOMPREP');
        this.trigger('STATUS:PAGE_STATUS_DOM');
        this.trigger('STATUS:PAGE_STATUS_DOMORLOAD');
      });

      _lib.onload(() => {
        this.trigger('STATUS:PAGE_STATUS_LOAD');
      });

      this.on('PAGE_STATUS_DOM', () => {
        if (this.pageId) {
          this.trigger('STATUS:PAGE_STATUS_ROUTING', this.pageId);
        }
      });
    }

    if (depend) {
      this.require([].concat(depend), call, 'Do');
    }
    else {
      call();
    }
  }
  init(id?: string | string[], depend?: string| string[]) {
    let { _lib } = this;
    if (_lib.isArray(id)) {
      [id, depend] = ['', id];
    }

    this.initPageId(<string>id);
    this.dispatch();
    this.triggerPageStatus(depend);
    return this;
  }
  constructor(_lib: any) {
    super();
    this._lib = _lib;
  
    let eventHandle = _lib.extend({
      events: {},
      listened: {}
    }, _lib.Events);
    this.event = _lib.extend(this.event, {
      eventHandle,
      on: function(eventName: string, callback: Function) {
        let { eventHandle } = this;
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
      },
      trigger: function(eventName: string, eventType: string, data: any[]) {
        let { eventHandle } = this;
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
      },
      off: function(eventName: string) {
        let { eventHandle } = this;
        eventHandle.off(eventName);
        delete eventHandle.listened[eventName];
        delete eventHandle.events[eventName];
      },
      init: function() {
        let { inited, _temp, TYPE_ON, TYPE_TRIGGER } = this;
        if (!inited && this._temp.length) {
          for (let item of this._temp) {
            if (item.type === TYPE_ON) {
              this.on(item.eventName, item.callback);
            }
            else if (item.type === TYPE_TRIGGER) {
              this.trigger(item.eventName, item.eventTYpe, item.data);
            }
          }
          inited = true;
        }
      }
    });
    this.event.init();
    this.storage._lib = _lib;

    this.trigger('STATUS:NAPP_DEFINE');
    this.trigger('STATUS:NBLOCK_DEFINE');
    this.trigger('STATUS:NSERVICE_DEFINE');

    this.on('NBLOCK_LOADED', (elem, ns, name, params) => {
      ns == null && (ns == '_default');
      let block = this.block(`${ns}.${name}`);
      if (block) {
        if (this._lib.isFunction(block.init)) {
          let call = () => {
            block.init(elem, params);
          }

          if (block.depend) {
            this.require([].concat(block.depend), call, 'Do');
          }
          else {
            call();
          }
        }
        else if (this._lib.isFunction(block)) {
          block(elem, params);
        }
      }
    });

    this.on('NBLOCK_INIT', () => {
      let blockEl = this._lib.querySelector('[data-nblock-id]');
      if (!blockEl || !blockEl.length) {
        return;
      }
      let blocks:any[] = [];
      for (let el of blockEl) {
        let auto = this._lib.data(el, 'nblockAuto');
        let level = parseInt(this._lib.data(el, 'nblockLevel')) || 5;
        blocks.push([level, auto, el]);
      }
      for (let item of blocks) {
        let [, auto, block] = item;
        if (auto === undefined || auto.toString() != 'false') {
          this.initBlock(block);
        }
      }
    });

    if (prepData) {
      removePrepData();
    }
  }
}