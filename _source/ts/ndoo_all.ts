/// <references src="./declare.d.ts" />
import * as _ from 'underscore';

export * from './ndoo_prep';
import * as _depend from './lib/depend';
import Events from './lib/event';
export let _lib = _.extend(_depend, {Events});
export * from './ndoo';
export * from './ndoo_block';