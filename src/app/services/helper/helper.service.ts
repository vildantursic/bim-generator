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

  filterWorksetsFromProjectData(projects: any): any {
    const worksets = [];

    projects.forEach(project => {
      project.workset.forEach(workset => {
        Object.defineProperty(workset, 'projectGUID', {
          enumerable: true,
          configurable: true,
          writable: true,
          value: project.guid
        });
        workset.name = `${project.name} | ${workset.name}`;
        worksets.push(workset);
      })
    })

    return {
      worksets: worksets,
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
