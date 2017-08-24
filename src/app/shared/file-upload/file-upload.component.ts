import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  template: `
    <input type="file" (change)="fileChange($event)" multiple="true" placeholder="Upload file" accept=".json, .txt">
  `,
})
export class FileUploadComponent implements OnInit {

  // chunks location
  // C:\Users\PCHARDWARE\Documents\CODE\bim-generator\src\assets\transaction-files

  @Output('onFilesUpload') onFilesUpload: EventEmitter<FileList> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      this.onFilesUpload.emit(fileList);
    }
  }

}
