import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EntityService {

  constructor(private service: MainService) { }

  /**
   * Gets array of entities
   * @returns {Observable<any>}
   */
  getEntities(): Observable<any> {
    return this.service.get('data', 'complex/4acb6bff-5b83-4c0d-bb1f-7f4e049240be/entity');
  }
}
