import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {

  constructor(private service: MainService) { }

  /**
   * Gets array of transactions
   * @param projectGUID
   * @param bimmodelGUID
   * @returns {Observable<any>}
   */
  getTransactions(projectGUID, bimmodelGUID): Observable<any> {
    return this.service.get('data', `project/${projectGUID}/bimmodel/${bimmodelGUID}/transaction?search[destination.project]=${projectGUID}`);
  }

  /**
   * Initialize transaction
   * @param projectGUID
   * @param bimmodelGUID
   * @param data
   * @returns {any}
   */
  initializeTransaction(projectGUID, bimmodelGUID, data): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/bimmodel/${bimmodelGUID}/transaction`, data)
  }

  /**
   * Send chunk in transaction
   * @param projectGUID
   * @param bimmodelGUID
   * @param guid
   * @param data
   * @returns {any}
   */
  sendChunk(projectGUID, bimmodelGUID, guid, data): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/bimmodel/${bimmodelGUID}/transaction/${guid}`, data)
  }

  /**
   * Finalize transaction
   * @param projectGUID
   * @param bimmodelGUID
   * @param guid
   * @returns {any}
   */
  finalizeTransaction(projectGUID, bimmodelGUID, guid): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/bimmodel/${bimmodelGUID}/transaction/${guid}/finalize`)
  }

  /**
   * Cancel transaction
   * @param projectGUID
   * @param bimmodelGUID
   * @param guid
   * @returns {any}
   */
  cancelTransaction(projectGUID, bimmodelGUID, guid): Observable<any> {
    return this.service.post('data', `project/${projectGUID}/bimmodel/${bimmodelGUID}/transaction/${guid}/cancel`)
  }
}
