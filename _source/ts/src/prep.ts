export let _isDebug = false;

const vars: any = {};
const func: any = {};
export let getVarsAndFunc = function(data) {
    if (data.use) {
        return data;
    }
    else {
        return {vars, func};
    }
}
// export const vars: any = {}
// export const func: any = {}