import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CheckoutService {

  constructor(private service: MainService) { }

  /**
   * Gets array of checkouts
   * @returns {Observable<any>}
   */
  getCheckouts(): Observable<any> {
    return this.service.get('data', 'projects');
  }
}
