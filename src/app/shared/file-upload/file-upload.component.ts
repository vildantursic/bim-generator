import {Component, OnInit, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  template: `
    <input #fileInput type="file" (change)="fileChange($event)" multiple="true" placeholder="Upload file" accept=".json, .txt, .js">
  `,
})
export class FileUploadComponent implements OnInit {

  @Output('onFilesUpload') onFilesUpload: EventEmitter<FileList> = new EventEmitter();
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.onFilesUpload.emit(fileList);
    }
    setTimeout(() => {
      this.fileInput.nativeElement.value = '';
    }, 1000)
  }

}
