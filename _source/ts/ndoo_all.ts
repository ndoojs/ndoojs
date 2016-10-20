export * from './src/prep';

import { _lib as _libBase } from './src/lib';
import * as _depend from './src/lib/depend';
import Events from './src/lib/event';
export let _lib = _libBase.extend(_libBase, _depend, {Events});

// export * from './src/main';
// export * from './src/block';