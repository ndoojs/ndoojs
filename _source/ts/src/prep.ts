import { EventApi } from './event/api';
import { EventBasic } from './event/basic';
import { getPrepData, PrepDataType } from './prepData';
let prepData = getPrepData();

class Prep extends EventApi {
  public _isDebug: boolean = false;
  public event: typeof EventBasic = EventBasic;

  public vars: any = {};
  public func: any = {};
  public _lib: any = {};

  constructor() {
    super();
    if (prepData) {
      this.vars = (prepData as PrepDataType).vars;
      this.func = (prepData as PrepDataType).func;
    }
  }
}

export { Prep }