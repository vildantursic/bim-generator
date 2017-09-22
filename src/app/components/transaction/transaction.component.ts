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

  selectedWorkset= {
    projectGUID: '',
    worksetGUID: ''
  };

  jobStatus = '';
  isInProcess = false;

  transactionGUID;
  transactionData = {
    worksetGUID: '',
    entityGUID: '',
    chunkNumber: 5,
    chunkSize: 20
  };

  progress = {
    sent: 0
  }

  worksets = [];
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
    this.isInProcess = true;
    this.transactionService.initializeTransaction(this.selectedWorkset.projectGUID,
                                                  this.selectedWorkset.worksetGUID,
                                                  this.transaction).subscribe(response => {
      if (response) {

        this.transactionGUID = response.guid;
        this.getTransactions();
        this.sendChunks();
      }
    });
  }

  sendChunks(): void {
    if (this.transactionGUID && this.chunks.length !== 0 && this.progress.sent < this.chunks.length) {
      this.transactionService.sendChunk(this.selectedWorkset.projectGUID,
                                        this.selectedWorkset.worksetGUID,
                                        this.transactionGUID,
                                        this.chunks[this.progress.sent]).subscribe(response => {
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
    this.transactionService.finalizeTransaction(this.selectedWorkset.projectGUID,
                                                this.selectedWorkset.worksetGUID,
                                                event.guid).subscribe(response => {
      this.getTransactions();
      this.getJobs(event);
      this.clearProgress();
      if (event.clear) {
        this.clearingData();
      }
    });
  }

  cancelTransaction(transactionGUID): void {
    this.transactionService.cancelTransaction(this.selectedWorkset.projectGUID,
                                              this.selectedWorkset.worksetGUID,
                                              transactionGUID).subscribe(response => {
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

  onWorksetSelected(event): void {
    this.selectedWorkset.worksetGUID = event.value.guid;
    this.selectedWorkset.projectGUID = event.value.projectGUID;

    this.transactionData.worksetGUID = event.value.guid;
    this.transactionData.entityGUID = event.value.entity[0];

    this.getTransactions();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((response: any) => {
      const data = this.helper.filterWorksetsFromProjectData(response.items);
      this.worksets = data.worksets;
    });
  }

  getTransactions(): void {
    this.transactionService.getTransactions(this.selectedWorkset.projectGUID, this.selectedWorkset.worksetGUID).subscribe(response => {
      this.transactions = response.items;
    });
  }

  getJobs(eventForTransaction): void {
    this.socketService.getJobs().subscribe((response: any) => {
      console.log(response);
    });
    if (eventForTransaction.repeat && !eventForTransaction.clear) {
      this.initializeTransaction();
    }
  }

  trackJob(data): void {
    console.log(data);
    if (data.hasOwnProperty('active')) {
      if (!data.active) {
        this.getTransactions();
        this.messageService.close();
        this.messageService.show('Transaction Finalized', 3000);
        this.isInProcess = false;
      }
    }
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
