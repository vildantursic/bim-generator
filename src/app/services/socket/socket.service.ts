import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {

  // socket: SocketIOClient.Socket;
  socket: any;

  constructor() {
    this.socket = io.connect(localStorage.getItem('server'), {
      transports: ['websocket']
    });
  }

  isConnected(): Observable<boolean> {
    return Observable.of(this.socket.connected);
  }

}
