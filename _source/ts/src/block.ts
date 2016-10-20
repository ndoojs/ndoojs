/// <references src="./declare.d.ts" />
import * as _ from 'underscore';

import { _blockData, _block, router, base } from './base';
import { trigger } from './event';
import * as _lib from './lib/depend';

let blockExist = function (namespace: string, set: boolean = false) {
  let nsmatch: string[] = namespace.match(/(.*?)(?:[/.]([^/.]+))$/);
  let name: string;
  if (!nsmatch) {
    nsmatch = [, '_default', namespace];

  }
  [, namespace, name] = nsmatch;
  if (set) {
    return _blockData._exist[`block.${namespace}.${name}`] = true;
  }
  else {
    return _blockData._exist[`block.${namespace}.${name}`]
  }
}

export let hasBlock = function (namespace: string) {
  return blockExist(namespace);
};

export let setBlock = function (namespace: string) {
  return blockExist(namespace, true);
};

export let block = function (ns: string, block?: any): any {
  let nsmatch: string[] = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
  let name: string;
  if (!nsmatch) {
    nsmatch = [, 'default', ns];
  }
  [ns, name] = nsmatch;
  if (arguments.length > 1) {
    return _block('block', ns, name, block);
  }
  else {
    return _block('block', ns, name);
  }
}

export let initBlock = function (elem: HTMLElement) {
  let blockId: string | string[] = _lib.data(elem, 'nblockId');
  blockId = blockId.split(/\s*,\s*|\s+/);

  let _call = function (blockId: string) {
    router.parse(
      /^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/,
      blockId, function (ns: string, blockName: string, params: string) {
        ns = ns.replace(/\//g, '.');
        let pkg: string = `${ns}.${block}`;
        if (block(pkg)) {
          trigger('NBLOCK_LOADED', elem, ns, blockName, params);
        }
        else if (hasBlock(pkg)) {
          base.require([`${ns}.${block}`], function () {
            trigger('NBLOCK_LOADED', elem, ns, blockName, params);
          }, 'Do');
        }
      });
  }

  _.each(blockId, (id: string) => {
    let _self = this;
    _call.call(_self, id);
  });
}