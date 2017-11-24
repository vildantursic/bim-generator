import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { ProjectService } from '../../services/project/project.service';
import { GeneratorService } from '../../services/utilities/generator/generator.service';
import { HelperService } from '../../services/helper/helper.service';
import { MessageService } from '../../services/utilities/message/message.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  fileImport = false;

  simulateFailure = false;
  chunkToFail;

  selectedBimModel= {
    projectGUID: '',
    bimModelGUID: ''
  };

  jobStatus = '';
  jobType = '';
  isInProcess = false;

  transactionGUID;
  transactionData = {
    bimModelGUID: '',
    entityGUID: '',
    chunkNumber: 5,
    chunkSize: 20
  };

  progress = {
    sent: 0
  }

  bimModels = [];
  transactions = [];

  transaction;
  chunks = [];
  chunkFiles = 0;

  constructor(private transactionService: TransactionService,
              private generator: GeneratorService,
              private helper: HelperService,
              private projectService: ProjectService,
              private messageService: MessageService) { }

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
    this.transactionService.initializeTransaction(this.selectedBimModel.projectGUID,
                                                  this.selectedBimModel.bimModelGUID,
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
      this.transactionService.sendChunk(this.selectedBimModel.projectGUID,
                                        this.selectedBimModel.bimModelGUID,
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
    this.transactionService.finalizeTransaction(this.selectedBimModel.projectGUID,
                                                this.selectedBimModel.bimModelGUID,
                                                event.guid).subscribe(response => {
      this.getTransactions();
      this.clearProgress();
      if (event.clear) {
        this.clearData();
      }
    });
  }

  cancelTransaction(transactionGUID): void {
    this.transactionService.cancelTransaction(this.selectedBimModel.projectGUID,
                                              this.selectedBimModel.bimModelGUID,
                                              transactionGUID).subscribe(response => {
      this.messageService.show('Transaction Canceled', 3000);
      this.getTransactions();
      this.clearData();
    });
  }

  onScriptUploaded(files): void {
    this.transactionService.fileUpload(files).subscribe((response: any) => {
      console.log(response)
    })
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

  onBimModelSelected(event): void {
    this.selectedBimModel.bimModelGUID = event.value.guid;
    this.selectedBimModel.projectGUID = event.value.projectGUID;

    this.transactionData.bimModelGUID = event.value.guid;
    this.transactionData.entityGUID = event.value.entity[0];

    this.getTransactions();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((response: any) => {
      const data = this.helper.filterBimModelsFromProjectData(response.items);
      this.bimModels = data.bimmodels;
    });
  }

  getTransactions(): void {
    this.transactionService
      .getTransactions(this.selectedBimModel.projectGUID, this.selectedBimModel.bimModelGUID)
      .subscribe(response => {
      this.transactions = response.items;
    });
  }

  startJob(data): void {
    this.getTransactions();

    if (data.hasOwnProperty('meta')) {
      if (data.meta.type === 'mergeBimModelJob') {
        this.jobType = data.meta.type;
      }
    }
  }

  finishJob(data): void {
    setTimeout(() => {
      this.getTransactions();
    }, 1000);

    if (data.hasOwnProperty('inNumberOf100')) {
      if (data.inNumberOf100 === 100 && this.jobType === 'mergeBimModelJob') {
        this.messageService.show('Transaction Finalized', 3000);
        this.isInProcess = false;
      }
    }
  }

  clearData(): void {
    this.clearProgress();
    this.chunks = [];
    this.chunkFiles = 0;
    this.transaction = undefined;
    this.transactionData.chunkNumber = 5;
    this.transactionData.chunkSize = 20;
    this.isInProcess = false;
  }

  clearProgress(): void {
    this.progress.sent = 0;
  }
}
