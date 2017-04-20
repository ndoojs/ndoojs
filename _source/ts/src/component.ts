export enum RegType {
  App,
  Block,
  Service
}

export let getComponent = (ndoo: any) => {
  /**
   * ndoo组件注册
   */
  return (path: string, type: RegType, isStatic = true) => (component: any) => {
    // 是否静态类型
    let instance = component;
    if (!isStatic) {
      instance = new component();
    }
    // 注册类型
    let method = '';
    switch (type) {
      case RegType.App:
        method = 'app';
        break;
      case RegType.Block:
        method = 'block';
        break;
      case RegType.Service:
        method = 'service';
        break;
    }
    // 注册
    method && ndoo[method](path, instance);
  }
}