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

    let rootUrl = localStorage.getItem('server');
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
    const checkouts = [];

    projects.forEach(project => {
      project.checkout.forEach(checkout => {
        Object.defineProperty(checkout, 'projectGUID', {
          enumerable: true,
          configurable: true,
          writable: true,
          value: project.guid
        });
        checkout.name = `${project.name} | ${checkout.name}`;
        checkouts.push(checkout);
      })
    })

    return {
      checkouts: checkouts,
      projects: projects
    };
  }

  downloadChunkAsFile(data): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `${data.chunk}-chunk.json`);
    dlAnchorElem.click();
  }
}
