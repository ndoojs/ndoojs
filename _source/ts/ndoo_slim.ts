export * from './src/prep';

import { _lib as _libBase } from './src/lib';
import * as _depend from './src/lib/depend_with_lib';
import Events from './src/lib/event_with_lib';
export let _lib = _libBase.extend(_libBase, _depend, {Events});

// export * from './src/main';
// export * from './src/block';