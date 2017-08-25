import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { ProjectService } from '../../services/project/project.service';
import { GeneratorService } from '../../services/utilities/generator/generator.service';
import { HelperService } from '../../services/helper/helper.service';
import { MessageService } from '../../services/utilities/message/message.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  fileImport = true;

  simulateFailure = false;
  chunkToFail;

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
  chunkFiles = [];

  constructor(private transactionService: TransactionService,
              private generator: GeneratorService,
              private helper: HelperService,
              private projectService: ProjectService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getTransactions();
    this.getProjects();
  }

  generateTransaction(): void {
    this.transaction = this.generator.generateTransaction(this.transactionData);
    this.generateChunks(this.transaction)

    this.initializeTransaction()
  }

  generateTransactionFromFiles(): void {
    let tempTransactionChunkData = [];

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
    this.transactionService.initializeTransaction(this.transaction).subscribe(response => {
      if (response) {
        this.transactionGUID = response.guid
        this.getTransactions();
        this.sendChunks();
      }
    });
  }

  sendChunks(): void {
    if (this.transactionGUID) {
      this.chunks.forEach(chunk => {
        this.transactionService.sendChunk(this.transactionGUID, chunk).subscribe(response => {
          this.progress.sent++;
          this.getTransactions();
          if (response.status === 400) {
            this.helper.downloadChunkAsFile(chunk);
          }
        });
      });
    }
  }

  finalizeTransaction(transactionGUID): void {
    this.transactionService.finalizeTransaction(transactionGUID).subscribe(response => {
      this.messageService.show('Transaction Finalized');
      this.getTransactions();
      this.clearingData();
    });
  }

  cancelTransaction(transactionGUID): void {
    this.transactionService.cancelTransaction(transactionGUID).subscribe(response => {
      this.messageService.show('Transaction Canceled');
      this.getTransactions();
      this.clearingData();
    });
  }

  onFilesUpload(files): void {
    this.chunkFiles = files;
    this.transactionData.chunkNumber = this.chunkFiles.length;

    var myReader:FileReader = new FileReader();
    let chunkNumber = 0;

    myReader.onloadend = (e) => {
      this.chunks.push({
        chunk: ++chunkNumber,
        items: JSON.parse(myReader.result)
      });
      if (chunkNumber < files.length) {
        readChunk(chunkNumber);
      }
      // delete files[0];
    }

    let readChunk = (fileNumber = 0) => {
      myReader.readAsText(files[fileNumber])
    }
    readChunk();
  }

  onCheckoutSelected(event): void {
    this.transactionData.checkoutGUID = event.value.guid;
    this.transactionData.entityGUID = event.value.entity[0];
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((response: any) => {
      this.checkouts =  this.helper.filterCheckoutsFromProjectData(response.items);
    });
  }

  getTransactions(): void {
    this.transactionService.getTransactions().subscribe(response => {
      this.transactions = response.items;
    });
  }

  clearingData(): void {
    this.progress.sent = 0;
    this.chunks = [];
    this.transaction = undefined;
    this.transactionData.chunkNumber = 5;
    this.transactionData.chunkSize = 20;
  }
}
