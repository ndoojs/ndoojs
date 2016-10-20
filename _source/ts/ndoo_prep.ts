import { getTempData } from './src/tempData';
let tempData = getTempData(true);
import { _isDebug, getVarsAndFunc } from './src/prep';
export { _isDebug }
export let { vars, func } = getVarsAndFunc(tempData);
import { event } from './src/event/eventBasic';
import { eventApi } from './src/event/eventApi';
export let { on, trigger, off } = eventApi(event);