import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  selected = false;

  constructor(private taransactionService: TransactionService) { }

  ngOnInit() {
  }

  ck(): void {
    console.log(this.selected)
  }
}
