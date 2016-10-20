/// <references src="./declare.d.ts" />
import * as _ from 'underscore';

import { _blockData, _block } from './blockData';
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

export let block = function (namespace: string, block: any) {
  let nsmatch: string[] = namespace.match(/(.*?)(?:[/.]([^/.]+))$/);
  let name: string;
  if (!nsmatch) {
    nsmatch = [, 'default', namespace];
  }
  [namespace, name] = nsmatch;
  if (arguments.length > 1) {
    _block('block', namespace, name, block);
  }
  else {
    _block('block', namespace, name);
  }
}

// _n.block = (namespace, block) ->
//   if nsmatch = namespace.match /(.*?)(?:[/.]([^/.]+))$/
//     [null, namespace, name] = nsmatch
//   else
//     [namespace, name] = [\_default, namespace]

//   if arguments.length > 1
//     _n._block \block, namespace, name, block
//   else
//     _n._block \block, namespace, name

export let initBlock = function (elem: HTMLElement) {
  let blockId: string | string[] = _lib.data(elem, 'nblockId');
  blockId = blockId.split(/\s*,\s*|\s+/);

  let _call = function (blockId: string) {
    let _self = this;
    _self.router.parse(
      /^(?:\/?)(.*?)(?:\/?([^\/?#]+))(?:\?(.*?))?(?:\#(.*?))?$/,
      blockId, function (namespace: string, block: string, params: string) {
        namespace = namespace.replace(/\//g, '.');
        let pkg = `${namespace}.${block}`;
        if (_self.block(pkg)) {
          _self.trigger('NBLOCK_LOADED', elem, namespace, block, params);
        }
        else if (_self.hasBlock(pkg)) {
          _self.require([`${namespace}.${block}`], function () {
            _self.trigger('NBLOCK_LOADED', elem, namespace, block, params);
          }, 'Do');
        }
      });
  }

  _.each(blockId, (id: string) => {
    let _self = this;
    _call.call(_self, id);
  });
}

// _n.on \NBLOCK_INIT, !->
//   blockEl = _lib.querySelector '[data-nblock-id]'
//   if not blockEl or not blockEl.length
//     return
//   blocks = []
//   for el in blockEl
//     auto =  _lib.data el, \nblockAuto
//     level = parseInt( _lib.data el, \nblockLevel ) or 5
//     blocks.push [level, auto, el]

//   blocks.sort (block1, block2) -> block1[0] > block2[0]

//   for item in blocks
//     [,auto, block] = item
//     if auto is undefined or auto.toString! isnt 'false'
//       _n.initBlock block