import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BimListComponent } from './bim-list/bim-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { StreamComponent } from './stream/stream.component';


@NgModule({
  declarations: [
    LoginComponent,
    BimListComponent,
    FileUploadComponent,
    StreamComponent
  ],
  exports: [
    MaterialDesignModule,
    LoginComponent,
    BimListComponent,
    FileUploadComponent,
    StreamComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
  ]
})
export class SharedModule { }
