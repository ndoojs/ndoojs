import * as event from './event';
import { eventApi } from './eventApi';
export let { on, trigger, off } = eventApi(event);