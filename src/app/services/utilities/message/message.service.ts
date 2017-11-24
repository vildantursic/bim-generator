import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  show(message, duration?): void {
    this.snackBar.open(message, '', duration ? { duration: duration } : null);
  }

  close(): void {
    this.snackBar.dismiss();
  }
}
