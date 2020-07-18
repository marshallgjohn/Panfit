import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {AccountService} from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {Credentials} from '../../model/credentials';

import {CustomValidatorsService} from '../../services/customvalidators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private customerValidatorService: CustomValidatorsService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
        email: ['',Validators.required],
        password: ['',[Validators.required, Validators.minLength(8)]]
      }
    );
  }

  get f() {return this.registerForm.controls;}



  onSubmit() {
    this.submitted = true;
    if(this.registerForm.invalid) {
      return;
    }
    this.accountService.register(new Credentials(this.f.username.value,this.f.password.value),this.f.email.value).subscribe();
    //this.accountService.login

  }
}
