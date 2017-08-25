import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bim-list',
  templateUrl: './bim-list.component.html',
  styleUrls: ['bim-list.component.scss']
})
export class BimListComponent {

  @Input() items = [];

  @Output('onFinalizeTransactionClicked') onFinalizeTransactionClicked: EventEmitter<string> = new EventEmitter();
  @Output('onCancelTransactionClicked') onCancelTransactionClicked: EventEmitter<string> = new EventEmitter();

  setTagColor(status): string {
    if (status === 'finished') {
      return 'primary'
    } else if (status === 'canceled') {
      return 'accent';
    } else {
      return '';
    }
  }

  isTagFinalizeOrCancel(status): boolean {
    if (status === 'finished' || status === 'canceled') {
      return true;
    }
    return false;
  }

}
