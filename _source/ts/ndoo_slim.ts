import { Main } from './src/main';
import { _lib } from './src/lib';
import { Events } from './src/lib/event_with_lib';
import * as depend from './src/lib/depend';

let lib = _lib.extend(_lib, Events, depend);

class Slim extends Main {
    constructor(lib) {
        super(lib);
    }
}

let ndoo = new Slim(lib);

export default ndoo;