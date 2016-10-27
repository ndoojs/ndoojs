import { Main } from './src/main';
let lib = {};

class Slim extends Main {
    constructor(lib) {
        super(lib);
    }
}

let ndoo = new Slim(lib);

export default ndoo;