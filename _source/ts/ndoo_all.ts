import { getTempData } from './src/tempData';
let tempData = getTempData();
import { _isDebug, getVarsAndFunc } from './src/prep';
export { _isDebug }
export let { vars, func } = getVarsAndFunc(tempData);

import { _lib as _libBase } from './src/lib';
import * as _depend from './src/lib/depend';
import { Events } from './src/lib/event';
export let _lib = _libBase.extend(_libBase, _depend, {Events});
export * from './src/event';
export * from './src/base';
export * from './src/app';
export * from './src/block';
export * from './src/service';
export * from './src/dispatch';