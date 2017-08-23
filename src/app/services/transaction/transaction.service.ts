import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

  constructor(private service: MainService) { }

  /**
   * Gets array of transactions
   * @returns {Observable<any>}
   */
  getTransactions(): Observable<any> {
    return this.service.get('data', 'transaction');
  }

  /**
   * Initialize transaction
   * @param data
   * @returns {any}
   */
  initializeTransaction(data): Observable<any> {
    return this.service.post('data', `transaction`, data)
  }

  /**
   * Send chunk in transaction
   * @param guid
   * @param data
   * @returns {any}
   */
  sendChunk(guid, data): Observable<any> {
    return this.service.post('data', `transaction/${guid}`, data)
  }

  /**
   * Finalize transaction
   * @param guid
   * @param data
   * @returns {any}
   */
  finalizeTransaction(guid, data): Observable<any> {
    return this.service.post('data', `transaction/${guid}`, data)
  }

  /**
   * Cancel transaction
   * @param guid
   * @param data
   * @returns {any}
   */
  cancelTransaction(guid, data): Observable<any> {
    return this.service.post('data', `transaction/${guid}`, data)
  }
}
