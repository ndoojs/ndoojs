export interface PrepDataType {
  eventData: any[],
  func: any,
  vars: any
}

export let getPrepData = function (): PrepDataType | boolean {
  if (typeof window != 'undefined' && window['ndoo_prep_data']) {
    return window['ndoo_prep_data'];
  }
  return false;
}

export let setPrepData = function () {
  let _self: any = {};
  if (typeof window != 'undefined') {
    _self = window;
  }
  if (!_self.ndoo_prep_data) {
    _self.ndoo_prep_data = {
      eventData: [],
      func: {},
      vars: {}
    };
  }
}

export let removePrepData = function () {
  if (typeof window != 'undefined' && window['ndoo_prep_data']) {
    delete window['ndoo_prep_data'];
  }
}
