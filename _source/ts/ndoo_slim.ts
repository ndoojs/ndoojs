/// <references src="./declare.d.ts" />
import * as _ from 'underscore';

export * from './ndoo_prep';
import * as _depend from './lib/depend_with_lib';
import Events from './lib/event_with_lib';
export let _lib = _.extend(_depend, {Events});