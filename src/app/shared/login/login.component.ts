import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { config } from '../../app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  user = {
    email: 'vildan.tursic@walter.ba',
    password: 'branisarajevo'
  };

  servers = [
    {
      code: 'l',
      url: 'http://localhost',
      name: 'Local'
    },
    {
      code: 's',
      url: 'https://staging.bimeye.com',
      name: 'Server'
    }
  ];
  server = 'https://staging.bimeye.com';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.EMAIL_REGEX)]);

  @Output('onLoginClicked') onLoginClicked: EventEmitter<{}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onServerChange(event): void {
    this.server = event.value;
    config.api = this.server;
  }

  login(): void {
    if (this.user.email !== '' && this.user.password !== '') {
      this.onLoginClicked.emit(this.user)
    }
  }
}
