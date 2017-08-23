import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  user = {
    email: '',
    password: ''
  };

  servers = [
    {
      url: 'http://localhost:3001',
      name: 'Local'
    },
    {
      url: 'https://staging.bimeye.com',
      name: 'Server'
    }
  ];
  serverUrl: 'http://localhost:3001';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.EMAIL_REGEX)]);

  @Output('onLoginClicked') onLoginClicked: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  login(): void {
    this.onLoginClicked.emit(this.user)
  }
}
