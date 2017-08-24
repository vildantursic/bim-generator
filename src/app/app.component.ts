import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { config } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngAfterViewInit(): void {
  }

  login(data): void {
    // TODO change on server response
    this.isLoggedIn = true;
    this.authService.login(data).subscribe((response: any) => {
      config.auth = response.jwt;
    });
  }
}
