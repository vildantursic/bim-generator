import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { BimListComponent } from './shared/bim-list/bim-list.component';

import { MainService } from './services/main.service';
import { HelperService } from './services/helper/helper.service';
import { TransactionService } from './services/transaction/transaction.service';
import { AuthService } from './services/auth/auth.service';
import {CheckoutService} from "./services/checkout/checkout.service";
import {EntityService} from "./services/entity/entity.service";

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
  ],
  providers: [
    MainService,
    HelperService,
    AuthService,
    TransactionService,
    CheckoutService,
    EntityService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
