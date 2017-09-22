import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private service: MainService) { }

  /**
   * login
   * @param data
   * @returns {any}
   */
  login(data): Observable<any> {
    return this.service.post('auth', `login`, data)
  }

  /**
   * Get user info
   * @returns {any}
   */
  getUser(): Observable<any> {
    return this.service.get('auth', `user`)
  }
}
