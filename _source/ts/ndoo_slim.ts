import { Main } from './src/main';
import { _lib as libBase } from './src/lib';
import { Events as libEvent } from './src/lib/event_with_lib';
import * as depend from './src/lib/depend';

let lib = libBase.extend(libBase, libEvent);

class Slim extends Main {
    constructor(lib) {
        super(lib);
    }
}

let ndoo = new Slim(lib);

export default ndoo;