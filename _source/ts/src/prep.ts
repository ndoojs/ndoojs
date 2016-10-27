import { EventApi } from './event/api';
import { EventBasic } from './event/basic';

class Prep extends EventApi {
  public _isDebug: boolean = false;
  public event: typeof EventBasic = EventBasic;

  public vars: any = {};
  public func: any = {};
  public _lib: any = {};

  constructor() {
    super();
  }
}

export { Prep }