import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MdSnackBar) { }

  show(message, duration?): void {
    this.snackBar.open(message, '', duration ? { duration: duration } : null);
  }

  close(): void {
    this.snackBar.dismiss();
  }
}
