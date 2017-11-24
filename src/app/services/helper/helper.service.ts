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
      } else if (service === 'file') {
        rootUrl = 'http://localhost:3002';
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

  filterBimModelsFromProjectData(projects: any): any {
    const bimmodels = [];

    projects.forEach(project => {
      project.bimmodel.forEach(bimmodel => {
        Object.defineProperty(bimmodel, 'projectGUID', {
          enumerable: true,
          configurable: true,
          writable: true,
          value: project.guid
        });
        bimmodel.name = `${project.name} | ${bimmodel.name}`;
        bimmodels.push(bimmodel);
      })
    })

    console.log(bimmodels);

    return {
      bimmodels: bimmodels,
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
