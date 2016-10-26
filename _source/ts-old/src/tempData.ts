export let getTempData = function (use: boolean = false): {
  eventTemp: any[],
  func: any,
  vars: any,
  use?: boolean
} {
  let _self: any = {};
  if (typeof window != 'undefined') {
    _self = window;
  }
  if (!_self.ndoo_temp_data) {
    _self.ndoo_temp_data = {
      eventTemp: [],
      func: {},
      vars: {}
    };
    if (use) {
      _self.ndoo_temp_data.use = use;
    }
  }
  return _self.ndoo_temp_data;
}