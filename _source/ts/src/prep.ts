import { EventApi } from './event/api';
import { EventBasic } from './event/basic';
import { applyMixins } from './util';

class Prep implements EventApi {
    public _isDebug: boolean = false;
    public event: typeof EventBasic;
    public on;
    public trigger;
    public off;

    public vars: any = {};
    public func: any = {};
    public _lib: any = {};

    constructor() {
        this.event = EventBasic;
    }
}

applyMixins(Prep, [EventApi]);

export { Prep }