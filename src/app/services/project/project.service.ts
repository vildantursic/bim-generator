import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

  constructor(private service: MainService) { }

  /**
   * Gets array of projects
   * @returns {Observable<any>}
   */
  getProjects(): Observable<any> {
    return this.service.get('data', 'project');
  }
}
