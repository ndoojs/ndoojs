export * from './src/prep';
import { event } from './src/event/eventBasic';
import { eventApi } from './src/event/eventApi';
export let { on, trigger, off } = eventApi(event);