export let eventApi = function(event: any) {
    let on = function(eventName: string | string[], callback: Function) {
        eventName = (<string>eventName).split(/\s*,\s*|\s+/);
        for (let e of <string[]>eventName) {
            event.on(e, callback);
        }
    };

    let trigger = function(eventName: string | string[], ...data: any[]) {
        let _index = eventName.indexOf(':');
        let type = (<string>eventName).substring(0, _index++) || 'DEFAULT';
        let e = (<string>eventName).substring(_index);

        event.trigger(e, type, data);
    };

    let off = function(eventName: string | string[]) {
      eventName = (<string>eventName).split(/\s*,\s*|\s+/);
      for(let e of <string[]>eventName) {
          event.off(e);
      }
    };

    return {on, trigger ,off};
}