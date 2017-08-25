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

  filterCheckoutsFromProjectData(projects: any): any {
    let checkouts = [];

    projects.forEach(project => {
      project.checkout.forEach(checkout => {
        checkout.name = `${project.name} | ${checkout.name}`
        checkouts.push(checkout);
      })
    })

    return checkouts;
  }

  downloadChunkAsFile(data): void {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    let dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `${data.chunk}-chunk.json`);
    dlAnchorElem.click();
  }
}
