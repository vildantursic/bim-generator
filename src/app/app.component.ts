import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  isLoggedIn = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = localStorage.getItem('auth') !== null;
  }

  ngAfterViewInit(): void {
  }

  login(data): void {
    this.authService.login(data).subscribe((response: any) => {
      if (response.hasOwnProperty('jwt')) {
        localStorage.setItem('auth', response.jwt);
        this.isLoggedIn = true;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('server');
    location.reload();
  }
}
