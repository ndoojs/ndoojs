declare interface NdooFuncStatic {
  [id: string]: any;
}
declare enum NdooRegType {
  App,
  Block,
  Service
}

declare interface NdooBase {
  [id: string]: any;
  _isDebug: boolean;
  pageId: string;

  getPk: (prefix?: string) => string;
  storage: {
    (key: string): any;
    <T>(key: string, value: T): T;
    (key: string, value: any, option: number): any;
    REWRITE: number;
    DESTROY: number;
  };

  require: (depend: string[], callback: Function, type: 'seajs' | 'do') => any;

  on: (eventName: string, callback: Function) => void;
  off: (eventName: string) => void;
  trigger: (eventName: string, ...param: any[]) => void;

  app: {
    (namespace: string): any;
    <T>(namespace: string): T;
    <T>(namespace: string, controller: T): T;
  }
  hasApp: (namespace: string) => boolean;
  setApp: (namespace: string) => boolean;

  block: {
    (namespace: string): any;
    <T>(namespace: string): T;
    <T>(namespace: string, block: T): T;
  }
  hasBlock: (namespace: string) => boolean;
  setBlock: (namespace: string) => boolean;
  initBlock: (elem: any) => void;

  service: {
    (namespace: string): any;
    <T>(namespace: string): T;
    <T>(namespace: string, service: T): T;
  }

  init: (id?: string, depend?: string[]) => void;

  func: NdooFuncStatic;

  vars: any;
  
  RegType: NdooRegType;

  Component: (path: string, type: NdooRegType, isStatic:boolean) => (component: any) => void;
}

declare var ndoo: NdooBase;

declare module "ndoojs" {
  export default ndoo;
  export enum RegType {
    App,
    Block,
    Service
  }
  export let Component: (path: string, type: any, isStatic:boolean) => (component: any) => void;
}