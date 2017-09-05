import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { ProjectService } from '../../services/project/project.service';
import { GeneratorService } from '../../services/utilities/generator/generator.service';
import { HelperService } from '../../services/helper/helper.service';
import { MessageService } from '../../services/utilities/message/message.service';
import { SocketService } from '../../services/socket/socket.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  fileImport = true;

  simulateFailure = false;
  chunkToFail;

  selectedCheckout = {
    projectGUID: '',
    checkoutGUID: ''
  };

  job = '';
  transactionGUID;
  transactionData = {
    checkoutGUID: '',
    entityGUID: '',
    chunkNumber: 5,
    chunkSize: 20
  };

  progress = {
    sent: 0
  }

  checkouts = [];
  transactions = [];

  transaction;
  chunks = [];
  chunkFiles = 0;

  constructor(private transactionService: TransactionService,
              private generator: GeneratorService,
              private helper: HelperService,
              private projectService: ProjectService,
              private messageService: MessageService,
              private socketService: SocketService) { }

  ngOnInit() {
    this.getProjects();
    this.socketService.socket.on('job' + this.job, (data) => {
      console.log(data)
    })
  }

  generateTransaction(): void {
    this.transaction = this.generator.generateTransaction(this.transactionData);
    this.generateChunks(this.transaction)

    this.initializeTransaction()
  }

  generateTransactionFromFiles(): void {
    const tempTransactionChunkData = [];

    this.chunks.forEach(chunk => {
      tempTransactionChunkData.push({
        chunk: chunk.chunk,
        size: chunk.items.length
      })
    })
    this.transaction = this.generator.generateTransaction(this.transactionData);
    this.transaction.transactionData = tempTransactionChunkData;

    this.initializeTransaction()
  }

  generateChunks(transaction): void {
    transaction.transactionData.forEach(data => {
      this.chunks.push(this.generator.generateChunks(data.chunk, data.size, this.chunkToFail ? this.chunkToFail : -1))
    })
  }

  initializeTransaction(): void {
    this.transactionService.initializeTransaction(this.selectedCheckout.projectGUID, this.selectedCheckout.checkoutGUID, this.transaction).subscribe(response => {
      if (response) {
        this.transactionGUID = response.guid
        this.getTransactions();
        this.sendChunks();
      }
    });
  }

  sendChunks(): void {
    if (this.transactionGUID && this.chunks.length !== 0 && this.progress.sent < this.chunks.length) {
      this.transactionService.sendChunk(this.selectedCheckout.projectGUID, this.selectedCheckout.checkoutGUID, this.transactionGUID, this.chunks[this.progress.sent]).subscribe(response => {
        this.progress.sent++;
        this.getTransactions();
        this.sendChunks();
        if (response.status === 400) {
          console.log('CHUNK FAILED: ', this.chunks[this.progress.sent]);
          console.log('RESPONSE FROM SERVER: ', response);
          // this.helper.downloadChunkAsFile(chunk);
        }
      });
    }
  }

  finalizeTransaction(event: { guid: string, clear: boolean, repeat: boolean }): void {
    this.transactionService.finalizeTransaction(this.selectedCheckout.projectGUID, this.selectedCheckout.checkoutGUID, event.guid).subscribe(response => {
      this.messageService.show('Transaction Finalized');
      this.getTransactions();
      this.clearProgress();
      if (event.clear) {
        this.clearingData();
      }
      // TODO feature should be moved to socket function, because transaction is not fully finalized on this step
      if (event.repeat && !event.clear) {
        this.initializeTransaction();
      }
    });
  }

  cancelTransaction(transactionGUID): void {
    this.transactionService.cancelTransaction(this.selectedCheckout.projectGUID, this.selectedCheckout.checkoutGUID, transactionGUID).subscribe(response => {
      this.messageService.show('Transaction Canceled');
      this.getTransactions();
      this.clearingData();
    });
  }

  onFilesUpload(files): void {
    this.transactionData.chunkNumber = _.cloneDeep(files.length);
    this.chunkFiles = _.cloneDeep(this.transactionData.chunkNumber);

    const myReader: FileReader = new FileReader();
    let chunkNumber = 0;

    myReader.onloadend = (e) => {
      ++chunkNumber

      this.chunks.push(JSON.parse(myReader.result));
      if (chunkNumber < files.length) {
        readChunk(chunkNumber);
      }
      // delete files[0];
    }

    const readChunk = (fileNumber = 0) => {
      myReader.readAsText(files[fileNumber])
    }
    readChunk();
  }

  onCheckoutSelected(event): void {
    this.selectedCheckout.checkoutGUID = event.value.guid;
    this.selectedCheckout.projectGUID = event.value.projectGUID;

    this.transactionData.checkoutGUID = event.value.guid;
    this.transactionData.entityGUID = event.value.entity[0];

    this.getTransactions();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((response: any) => {
      const data = this.helper.filterCheckoutsFromProjectData(response.items);
      this.checkouts = data.checkouts;
    });
  }

  getTransactions(): void {
    this.transactionService.getTransactions(this.selectedCheckout.projectGUID, this.selectedCheckout.checkoutGUID).subscribe(response => {
      this.transactions = response.items;
    });
  }

  clearProgress(): void {
    this.progress.sent = 0;
  }

  clearingData(): void {
    this.clearProgress();
    this.chunks = [];
    this.chunkFiles = 0;
    this.transaction = undefined;
    this.transactionData.chunkNumber = 5;
    this.transactionData.chunkSize = 20;
  }
}
