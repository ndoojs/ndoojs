import { Prep } from './prep';
import { Storage } from './storage';
import { Router } from './router';

export class Main extends Prep {

  public _pk: number = +new Date();
  public pageId: string = '';
  public _blockData = {
    _block: {},
    _app: {},
    _service: {},
    _exist: {}
  }
  public getPk(prefix: string = '') {
    return `prefix${++this._pk}`;
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
  public storage: typeof Storage = Storage;
  public route: typeof Router = Router;
  public require(depend: any[], callback: Function, type: string): void {
    if (type.toLocaleLowerCase() == 'do') {
      Do.apply(null, depend.concat(callback));
    }
    else if (type.toLocaleLowerCase() == 'seajs') {
      seajs.use(depend, callback);
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
    this._blockExist(ns);
  }
  setBlock(ns: string) {
    this._blockExist(ns, true);
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
  service(ns: string, service: any) {
    let nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
    let name: string;

    if (!nsmatch) {
      nsmatch = [, '_default', ns];
    }
    [, ns, name] = nsmatch;

    if (arguments.length > 1) {
      this._block('service', ns, name, service);
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
  constructor(lib: any) {
    super();
    this._lib = lib;
    let eventHandle = lib.extend({
      events: {},
      listened: {}
    }, lib.Events);
    this.event = lib.extend(this.event, {
      eventHandle,
      on: function(eventName: string, callback: Function) {
        
      },
      trigger: function(eventName: string, eventType: string, data: any[]) {

      },
      off: function(eventName: string) {

      },
      init: function() {}
    });
    this.trigger('STATUS:NAPP_DEFINE');
    this.trigger('STATUS:NBLOCK_DEFINE');
    this.trigger('STATUS:NSERVICE_DEFINE');
  }
}