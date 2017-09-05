import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

  constructor(private service: MainService) { }

  /**
   * Gets array of transactions
   * @param projectGUID
   * @param checkoutGUID
   * @returns {Observable<any>}
   */
  getTransactions(projectGUID, checkoutGUID): Observable<any> {
    return this.service.get('data', `project/${projectGUID}/checkout/${checkoutGUID}/transaction?search[destination.project]=${projectGUID}`);
  }

  /**
   * Initialize transaction
   * @param projectGUID
   * @param checkoutGUID
   * @param data
   * @returns {any}
   */
  initializeTransaction(projectGUID, checkoutGUID, data): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/checkout/${checkoutGUID}/transaction`, data)
  }

  /**
   * Send chunk in transaction
   * @param projectGUID
   * @param checkoutGUID
   * @param guid
   * @param data
   * @returns {any}
   */
  sendChunk(projectGUID, checkoutGUID, guid, data): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/checkout/${checkoutGUID}/transaction/${guid}`, data)
  }

  /**
   * Finalize transaction
   * @param projectGUID
   * @param checkoutGUID
   * @param guid
   * @returns {any}
   */
  finalizeTransaction(projectGUID, checkoutGUID, guid): Observable<any> {
    return this.service.post('data', `transaction/${guid}/finalize`)
  }

  /**
   * Cancel transaction
   * @param projectGUID
   * @param checkoutGUID
   * @param guid
   * @returns {any}
   */
  cancelTransaction(projectGUID, checkoutGUID, guid): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/checkout/${checkoutGUID}/transaction/${guid}/cancel`)
  }
}
