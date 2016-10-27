export class Router {
  static parse(route: RegExp, url: string, callback: Function) {
    let routeMatch = route.exec(url);
    if (routeMatch != null) {
      callback.apply(null, routeMatch.slice(1));
    }
  }
}