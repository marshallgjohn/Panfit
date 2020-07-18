import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AccountService} from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Credentials} from '../model/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
  //template:'Username: <input type="text" [(ngModel)]="usernameControl">'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

 credentials: Credentials = new Credentials('','');


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get f() { return this.loginForm.controls;}

  onSubmit() {
    this.submitted = true;

    if(this.loginForm.invalid) {
      return;
    }
    this.credentials.username = this.f.username.value;
    this.credentials.password = this.f.password.value;

    this.accountService.login(this.credentials);


  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

}
