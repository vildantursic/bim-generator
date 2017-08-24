import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { HelperService } from './helper/helper.service';
import {config} from "../app.config";

@Injectable()
export class MainService {

  options;

  constructor(private http: Http, private helper: HelperService) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('auth', config.auth);
  }

  /**
   * Get Request
   *
   * @param service
   * @param route
   * @param queryParams
   * @returns {Observable<R>}
   */
  get(service: string, route: string, queryParams?: {}): Observable<any> {

    const headers = new Headers();
    this.createAuthorizationHeader(headers)
    return this.http.get(this.helper.generateRoute(service, route, queryParams), {
      headers: headers
    })
      .map((res: Response) => res.json())
      .catch((err: Error) => {
        return Observable.of(err)
      });
  }

  /**
   * Post Request
   *
   * @param service
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<R>}
   */
  post(service: string, route: string, data?: {}, queryParams?: {}): any {

    return this.http.post(this.helper.generateRoute(service, route, queryParams), data)
      .map((res: Response) => res.json())
      .catch((err: Error) => {
        return Observable.of(err)
      });
  }

  /**
   * Put Request
   *
   * @param service
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<R>}
   */
  put(service: string, route: string, data?: {}, queryParams?: {}) {

    return this.http.put(this.helper.generateRoute(service, route, queryParams), data)
      .map((res: Response) => res.json())
      .catch((err: Error) => {
        return Observable.of(err)
      });
  }

  /**
   * Delete Request
   *
   * @param service
   * @param route
   * @param queryParams
   * @returns {Observable<R>}
   */
  delete(service: string, route: string, queryParams?: {}) {

    return this.http.delete(this.helper.generateRoute(service, route, queryParams))
      .map((res: Response) => res.json())
      .catch((err: Error) => {
        return Observable.of(err)
      });
  }

}
