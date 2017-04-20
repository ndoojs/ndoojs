import { Ndoo } from './src/ndoo';
import { RegType, getComponent } from './src/component';
let ndoo = new Ndoo();
let Component = getComponent(ndoo);

export default ndoo;
export {RegType, Component};