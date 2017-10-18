import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BimModelService {

  constructor(private service: MainService) { }

  /**
   * Gets array of checkouts
   * @returns {Observable<any>}
   */
  getBimModels(): Observable<any> {
    return this.service.get('data', 'bimmodel');
  }
}
