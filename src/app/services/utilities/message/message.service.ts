import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MdSnackBar) { }

  show(message): void {
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }
}
