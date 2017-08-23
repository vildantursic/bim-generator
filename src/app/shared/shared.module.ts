import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from './material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {BimListComponent} from "./bim-list/bim-list.component";


@NgModule({
  declarations: [
    LoginComponent,
    BimListComponent
  ],
  exports: [
    MaterialDesignModule,
    LoginComponent,
    BimListComponent
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
