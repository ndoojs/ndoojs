declare var UnderscoreConstructor: any;
declare module "underscore" {
    export = UnderscoreConstructor;
}

declare var jQueryConstructor: any;
declare module "jquery" {
    export = jQueryConstructor;
}
declare module "zepto" {
    export = jQueryConstructor;
}

declare namespace BackboneConstructor {
    export let Events: any;
}

declare module "backbone" {
    export = BackboneConstructor;
}

declare var NdooLibConstructor: any;
declare module "ndoo_lib" {
    export = NdooLibConstructor;
}
declare var Do: Function
declare var seajs: {
    use: Function
}