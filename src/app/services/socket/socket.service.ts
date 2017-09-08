import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main.service';

@Injectable()
export class SocketService {

  // socket: SocketIOClient.Socket;
  socket: any;

  constructor(private service: MainService) {
    this.socket = io.connect(localStorage.getItem('server'), {
      transports: ['websocket']
    });
  }

  isConnected(): Observable<boolean> {
    return Observable.of(this.socket.connected);
  }

  /**
   * Gets array of jobs
   * @returns {Observable<any>}
   */
  getJobs(): Observable<any> {
    return this.service.get('data', `job`);
  }

}
