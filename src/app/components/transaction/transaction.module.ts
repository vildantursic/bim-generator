import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TransactionComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TransactionModule { }
