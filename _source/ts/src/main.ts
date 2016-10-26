import { Prep } from './prep';

export class Main extends Prep {
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

  constructor(lib: any) {
    super();
    this._lib = lib;
  }
}