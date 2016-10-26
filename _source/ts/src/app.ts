export class App {
    public _blockData: {
        _block: {},
        _app: {},
        _service: {},
        _exist: {}
    }
    public _block: Function;

    hasApp(ns: string) {
        return this._blockData._exist[`app.${ns}`]
    }
    setApp(ns: string) {
        return this._blockData._exist[`app.${ns}`] = true;
    }
    app(ns: string, app?: any) {
        let nsmatch = ns.match(/(.*?)(?:[/.]([^/.]+))$/);
        let appName: string;
        if (!nsmatch) {
            nsmatch = [, null, ns]
        }
        [, ns, appName] = nsmatch;

        if (arguments.length > 1) {
            return this._block('app', ns, appName, app);
        }
        else {
            return this._block('app', ns, appName);
        }
    }
}