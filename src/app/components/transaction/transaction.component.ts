import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { ProjectService } from '../../services/project/project.service';
import { EntityService } from '../../services/entity/entity.service';
import Generator from '../../helpers/generator';
import Helper from '../../helpers/helper';

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
    checkoutGUID: "42368359-025f-426e-a48b-9a89e9615b11",
    entityGUID: "59ef1a21-31b2-4f92-bea8-23576b8a1f4f",
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
              private generator: Generator,
              private helper: Helper,
              private projectService: ProjectService,
              private entityService: EntityService) { }

  ngOnInit() {
    this.getTransactions();
    this.getProjects();
  }

  generateTransaction(): void {
    this.transaction = this.generator.generateTransaction(this.transactionData);
    this.generateChunks(this.transaction)

    this.initializeTransaction()
  }

  generateChunks(transaction): void {
    console.log('TRANSACTION', transaction)
    transaction.transactionData.forEach(data => {
      this.chunks.push(this.generator.generateChunks(data.chunk, data.size, this.chunkToFail ? this.chunkToFail : -1))
    })
    console.log('CHUNKS', this.chunks)
  }

  getChunks(): void {
    console.log(this.chunks)
  }

  initializeTransaction(): void {
    this.transactionService.initializeTransaction(this.transaction).subscribe(response => {
      this.getTransactions();
    });
  }

  sendChunks(): void {
    if (this.transactionGUID) {
      this.chunks.forEach(chunk => {
        this.transactionService.sendChunk(this.transactionGUID, chunk)
      });
    }
  }

  finalizeTransaction(): void {
    this.transactionService.finalizeTransaction(this.transactionGUID);
  }

  cancelTransaction(): void {
    this.transactionService.cancelTransaction(this.transactionGUID);
  }

  onFilesUpload(files): void {
    this.chunkFiles = files;
    // console.log(this.chunkFiles);
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
      console.log(this.transactions)
    });
  }

  clearingData(): void {
    this.chunks = [];
    this.transaction = undefined;
  }
}
