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
    return this.service.get('data', 'complex/dac1d3d6-1511-4f08-a62e-610b4132440b/entity');
  }
}
