declare var UnderscoreConstructor: any;
declare module "underscore" {
    export = UnderscoreConstructor;
}

declare var jQueryConstructor: any;
declare module "$" {
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