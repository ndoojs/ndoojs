import { Main } from './src/main';
import { App } from './src/app';
import { applyMixins } from './src/util';
let lib = {};

class Slim extends Main {
    constructor(lib) {
        super(lib);
    }
}

applyMixins(Slim, [App]);

let ndoo = new Slim(lib);
export default ndoo;