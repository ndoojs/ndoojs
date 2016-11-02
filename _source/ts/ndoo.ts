import { NdooBase } from './src/base';
import { _lib as libBase } from './src/lib';
import { Events as libEvent } from './src/lib/event';

let lib = libBase.extend(libBase, {Events: libEvent});

class Ndoo extends NdooBase {
    constructor(lib) {
        super(lib);
    }
}

let ndoo = new Ndoo(lib);

export = ndoo;