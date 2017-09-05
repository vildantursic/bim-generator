import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { BimListComponent } from './shared/bim-list/bim-list.component';

import { MainService } from './services/main.service';
import { HelperService } from './services/helper/helper.service';
import { TransactionService } from './services/transaction/transaction.service';
import { AuthService } from './services/auth/auth.service';
import { ProjectService } from './services/project/project.service';
import { CheckoutService } from './services/checkout/checkout.service';
import { EntityService } from './services/entity/entity.service';
import { GeneratorService } from './services/utilities/generator/generator.service';
import { MessageService } from './services/utilities/message/message.service';
import { SocketService } from './services/socket/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    MainService,
    HelperService,
    AuthService,
    TransactionService,
    ProjectService,
    CheckoutService,
    EntityService,
    GeneratorService,
    MessageService,
    SocketService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
