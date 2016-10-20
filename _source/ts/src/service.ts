import { _lib } from './lib';
import { _block } from './base';
import { trigger } from'./event';

export let service = function (ns: string, service: any) {
  let nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
  let name: string;

  if (!nsmatch) {
    nsmatch = [, '_default', ns];
  }
  [, ns, name] = nsmatch;

  if (arguments.length > 1) {
    _block('service', ns, name, service);
  }
  else {
    service = _block('service', ns, name);
    if (service && _lib.isFunction(service.init)) {
      return service.init();
    }
    else {
      return service
    }
  }
}

trigger('STATUS:NSERVICE_DEFINE');