import { getTempData } from './src/tempData';
let tempData = getTempData();

import { Prep } from './src/prep';
import { base as Base } from './src/base';
class Slim implements Prep {
    public _isDebug: boolean;
    public vars;
    public func;
    public _lib;
    public event;
    public on;
    public trigger;
    public off;
    public _pk;

    constructor() {
        // this.event = 
    }
}

applyMixins(Slim, [Prep]);

export let ndoo = new Slim();

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
// import { _isDebug, getVarsAndFunc } from './src/prep';
// export { _isDebug }
// export let { vars, func } = getVarsAndFunc(tempData);

// import { _lib as _libBase } from './src/lib';
// import * as _depend from './src/lib/depend';
// import { Events } from './src/lib/event_with_lib';
// export let _lib = _libBase.extend(_libBase, _depend, {Events});
// export * from './src/event';
// export * from './src/app';
// export * from './src/block';
// export * from './src/service';
// export * from './src/dispatch';