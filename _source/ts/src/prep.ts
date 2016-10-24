import { event as EventBasic } from './event/eventBasic';
import { EventApi } from './event/eventApi';

export class Prep extends EventApi {
  private _isDebug: boolean = false;
  public vars: any = {};
  public func: any = {};
  public _lib: any = {};

  public event: typeof EventBasic;

  constructor() {
    super();
    this.event = EventBasic;
  }
}