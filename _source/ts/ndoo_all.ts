import { Main } from './src/main';
import { _lib as libBase } from './src/lib';
import { Events as libEvent } from './src/lib/event';

let lib = libBase.extend(libBase, {libEvent});

class Ndoo extends Main {
    constructor(lib) {
        super(lib);
    }
}

let ndoo = new Ndoo(lib);

export = ndoo;