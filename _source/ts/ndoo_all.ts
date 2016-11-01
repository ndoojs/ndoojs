import { Main } from './src/main';
import { _lib } from './src/lib';
import { Events } from './src/lib/event';
import * as depend from './src/lib/depend';

let lib = _lib.extend(_lib, {Events}, depend);

class Ndoo extends Main {
    constructor(lib) {
        super(lib);
    }
}

let ndoo = new Ndoo(lib);

export = ndoo;