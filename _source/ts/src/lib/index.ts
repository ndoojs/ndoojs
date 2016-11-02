import * as _ from 'underscore';
import * as depend from './depend'
import { Events } from './event';
export let _lib = _.extend({ Events }, depend, _);