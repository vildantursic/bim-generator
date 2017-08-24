import { config } from '../../app.config';

export class HelperService {

  /**
   * Function combines route url and query params
   *
   * @param service
   * @param route
   * @param queryParams
   * @returns {string}
   */
  generateRoute(service: string, route: string, queryParams?: {}): string {

    let rootUrl = config.api;
    if (rootUrl === 'http://localhost') {
      if (service === 'auth') {
        rootUrl = 'http://localhost:3000';
      } else {
        rootUrl = 'http://localhost:3001';
      }
    }

    let reqUrl = `${rootUrl}/services/${service}/v1/${route}`;
    if (queryParams) {
      reqUrl += '?';
      for (const obj in queryParams) {
        if (obj) {
          reqUrl += obj + '=' + queryParams[obj] + '&';
        }
      }
    }

    return reqUrl;
  }
}
