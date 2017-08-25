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

  constructor(private authService: AuthService) {
    this.isLoggedIn = !!localStorage.getItem('auth');
  }

  ngAfterViewInit(): void {
  }

  login(data): void {
    this.isLoggedIn = true;
    this.authService.login(data).subscribe((response: any) => {
      localStorage.setItem('auth', response.jwt);
    });
  }
}
