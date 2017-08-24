import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {BimListComponent} from "./bim-list/bim-list.component";
import { FileUploadComponent } from './file-upload/file-upload.component';


@NgModule({
  declarations: [
    LoginComponent,
    BimListComponent,
    FileUploadComponent
  ],
  exports: [
    MaterialDesignModule,
    LoginComponent,
    BimListComponent,
    FileUploadComponent
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
