import { Prep } from './prep';
import { Storage } from './storage';
import { Router } from './router';
import { _lib as lib } from './lib';
import { getPrepData, removePrepData } from './prepData';

let prepData = getPrepData();

export class Ndoo extends Prep {
  public _lib = lib;
  /**
   * page id
   *
   * @name pageId
   * @memberof ndoo
   * @type {string}
   */
  public pageId: string = '';
  /**
   * initPageId 初始化 pageId
   *
   * @private
   * @name initPageId
   * @memberof ndoo
   */
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
  /**
   * 内部_pk主键
   * 
   * @private
   * @name _pk
   * @memberof ndoo
   */
  private _pk: number = +new Date();
  /**
   * 获取唯一key
   *
   * @method
   * @name getPk
   * @memberof ndoo
   * @param prefix {string} 前缀
   * @return {string} 键名
   */
  public getPk(prefix: string = '') {
    return `${prefix}${++this._pk}`;
  }
  public storage: typeof Storage = Storage;
  public router: typeof Router = Router;
  private _loader = {
    app: 'do',
    block: 'do',
    init: 'do',
    appLoader: null,
    blockLoader: null,
    initLoader: null,
    doLoader: function(depend: any[], callback: Function) {
      Do.apply(null, depend.concat(callback));
    },
    seajsLoader: function(depend: any[], callback: Function) {
      seajs.use(depend, callback);
    }
  };
  /**
   * 设置加载器
   * 
   * @method
   * @name setLoader
   * @memberof ndoo
   * @param type {string} 加载器类型
   * @param loader {Function} 加载器回调函数
   */
  public setLoader(type: string, loader: Function) {
    this._loader[type] = `${type}Loader`;
    this._loader[`${type}Loader`] = loader;
  }
  /**
   * 依赖加载方法
   * 
   * @method
   * @name require
   * @memberof ndoo
   * @param depend {array} 依赖
   * @param callback {Function} 架设函数
   * @param type {string} 加载器类型 app/block/service
   */
  public require(depend: any[], callback: Function, type: string): void {
    type = type.toLowerCase();
    if (this._loader[`${type}Loader`]) {
      this[type](depend, callback);
    }
    else {
      throw new Error('require load is not define');
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
      for (let ns of nsArr) {
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
      for (let ns of nsArr) {
        if (!this._lib.has(temp, ns)) {
          return undefined;
        }
        temp = temp[ns];
      }
      return temp[name];
    }
  }
  /**
   * 检测是否存在指定app
   *
   * @method
   * @name hasApp
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @return {boolean} 是否在存指定的app
   */
  hasApp(ns: string) {
    return this._blockData._exist[`app.${ns}`]
  }
  /**
   * 标识指定app已存在
   *
   * @method
   * @name setApp
   * @memberof ndoo
   * @param {string} namespace 名称空间
   */
  setApp(ns: string) {
    return this._blockData._exist[`app.${ns}`] = true;
  }
  /**
   * 添加app实现
   *
   * @method
   * @name app
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {object} controller 控制器
   */
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
  /**
   * 检测是否存在指定block
   *
   * @private
   * @param {string} ns 名称空间
   * @param {set} boolean 是否标记block已存在
   * @return {boolean} 返加block标记
   */
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
  /**
   * 检测是否存在指定block
   *
   * @method
   * @name hasBlock
   * @memberof ndoo
   * @param {string} ns 名称空间
   * @return {boolean} 判断block是否存在
   */
  hasBlock(ns: string) {
    return this._blockExist(ns);
  }
  /**
   * 标识指定block
   *
   * @method
   * @name setBlock
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @return {boolean} 设置标识成功
   */
  setBlock(ns: string) {
    return this._blockExist(ns, true);
  }
  /**
   * 添加block实现
   *
   * @method
   * @name block
   * @memberof ndoo
   * @param {string} namespace 名称空间
   * @param {(object|function)} block 模块实现
   * @return {(boolean|object|function)} 是否成功|标识本身
   */
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
  /**
   * 初始化模块
   *
   * @method
   * @name initBlock
   * @memberof ndoo
   * @param {DOMElement} elem 初始化的元素
   */
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
            }, this._loader['block']);
          }
        });
    }
    _lib.each(blockId, (id: string) => {
      let _self = this;
      _call.call(_self, id);
    });
  }
  private _bindBlockEvent() {
    this.on('NBLOCK_LOADED', (elem, ns, name, params) => {
      ns == null && (ns = '_default');
      let block = this.block(`${ns}.${name}`);
      if (block) {
        if (this._lib.isFunction(block.init)) {
          let call = () => {
            block.init(elem, params);
          }

          if (block.depend) {
            this.require([].concat(block.depend), call, this._loader['block']);
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
      blocks = blocks.sort((block1: any, block2: any) => block1[0] - block2[0]);
      for (let item of blocks) {
        let [, auto, block] = item;
        if (auto === undefined || auto.toString() != 'false') {
          this.initBlock(block);
        }
      }
    });
  }
  /**
   * 添加/获取serivce
   *
   * @method
   * @name service
   * @memberof ndoo
   * @param {string}   namespace 名称空间
   * @param {variable} service 对象
   * @example var _n = ndoo;
   * _n.service('user', {
   *   hasSignin: function(){
   *     return false;
   *   }
   * });
   * user = _n.service('user');
   * console.log(user.hasSignin());
   */
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
  /**
   * 路由函数
   *
   * @private
   * @method
   * @name dispatch
   * @memberof ndoo
   */
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
      let _self = this;
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

      let run = function() {
        let args: any[] = [].slice.call(arguments, 0);
        args.unshift(params);
        if (actionName) {
          _self.trigger('NAPP_ACTION_BEFORE', appData, actionName, params);
          _self.trigger(`NAPP_${filterPrefix}_ACTION_BEFORE`, appData, actionName, params);

          if (appData[`${actionName}Before`]) {
            appData[`${actionName}Before`].apply(appData, args);
          }
          if (appData[`${actionName}Action`]) {
            appData[`${actionName}Action`].apply(appData, args);
          }
          if (appData[`${actionName}After`]) {
            appData[`${actionName}After`].apply(appData, args);
          }

          _self.trigger(`NAPP_${filterPrefix}_ACTION_AFTER`, appData, actionName, params);
          _self.trigger('NAPP_ACTION_AFTER', appData, actionName, params);
        }
        _self.trigger('STATUS:NBLOCK_INIT');
      }

      if (depend.length) {
        this.require(_lib.uniq(depend), run, this._loader['app']);
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
          }, this._loader['app']);
        }
        else {
          this.trigger('STATUS:NBLOCK_INIT');
        }
      });
    });
  }
  /**
   * 触发页面状态
   *
   * @private
   * @method
   * @name triggerPageStatus
   * @memberof ndoo
   * @param depend {string|array} 赖数组
   */
  public triggerPageStatus(depend: string | string[]) {
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
    depend ? this.require([].concat(depend), call, this._loader['init']) : call();
  }
  /**
   * 初始化页面
   *
   * @method
   * @name init
   * @memberof ndoo
   * @param {string} id DOM的ID或指定ID
   * @param {array} depend 依赖
   * @example // ndoo alias _n
   * _n.init('home/index')
   * // set depend
   * _n.init('home/index', ['library', 'common'])
   */
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
  private _rebuildEvent() {
    let { _lib } = this;
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
        if (!inited && _temp.length) {
          for (let item of _temp) {
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
  }
  constructor() {
    super();
    this.storage._lib = this._lib;

    this._rebuildEvent();
    this.event.init();

    this.trigger('STATUS:NAPP_DEFINE');
    this.trigger('STATUS:NBLOCK_DEFINE');
    this.trigger('STATUS:NSERVICE_DEFINE');
    this._bindBlockEvent();

    if (prepData) {
      removePrepData();
    }
  }
}