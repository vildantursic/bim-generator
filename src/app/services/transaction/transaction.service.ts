import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

  constructor(private service: MainService) { }

  /**
   * Gets array of transactions
   * @param projectGUID
   * @param worksetGUID
   * @returns {Observable<any>}
   */
  getTransactions(projectGUID, worksetGUID): Observable<any> {
    return this.service.get('data', `project/${projectGUID}/workset/${worksetGUID}/transaction?search[destination.project]=${projectGUID}`);
  }

  /**
   * Initialize transaction
   * @param projectGUID
   * @param worksetGUID
   * @param data
   * @returns {any}
   */
  initializeTransaction(projectGUID, worksetGUID, data): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/workset/${worksetGUID}/transaction`, data)
  }

  /**
   * Send chunk in transaction
   * @param projectGUID
   * @param worksetGUID
   * @param guid
   * @param data
   * @returns {any}
   */
  sendChunk(projectGUID, worksetGUID, guid, data): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/workset/${worksetGUID}/transaction/${guid}`, data)
  }

  /**
   * Finalize transaction
   * @param projectGUID
   * @param worksetGUID
   * @param guid
   * @returns {any}
   */
  finalizeTransaction(projectGUID, worksetGUID, guid): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/workset/${worksetGUID}/transaction/${guid}/finalize`)
  }

  /**
   * Cancel transaction
   * @param projectGUID
   * @param worksetGUID
   * @param guid
   * @returns {any}
   */
  cancelTransaction(projectGUID, worksetGUID, guid): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/workset/${worksetGUID}/transaction/${guid}/cancel`)
  }
}
