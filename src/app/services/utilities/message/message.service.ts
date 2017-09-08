import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MdSnackBar) { }

  show(message, duration = 3000): void {
    this.snackBar.open(message, '');
  }

  close(): void {
    this.snackBar.dismiss();
  }
}
