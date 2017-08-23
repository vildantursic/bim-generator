import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { CheckoutService } from './services/checkout/checkout.service';
import { EntityService } from './services/entity/entity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  isLoggedIn = false;

  constructor(private authService: AuthService,
              private checkoutService: CheckoutService,
              private entityService: EntityService) { }

  ngAfterViewInit(): void {
    this.getEntities();
  }

  login(data): void {
    // TODO change on server response
    this.isLoggedIn = true;
    this.authService.login(data).subscribe((response: any) => {
      console.log(response);
    });
  }

  getCheckouts(): void {
    this.checkoutService.getCheckouts().subscribe((response: any) => {
      console.log(response);
    });
  }

  getEntities(): void {
    this.entityService.getEntities().subscribe((response: any) => {
      console.log(response);
    });
  }
}
