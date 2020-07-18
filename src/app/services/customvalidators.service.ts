import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, Form } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  MatchPassword(password: string, retypedPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const retypedPasswordControl = formGroup.controls[retypedPassword];

      if(!passwordControl || !retypedPasswordControl) {
        return null;
      }

      if (retypedPasswordControl.errors && !retypedPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if(passwordControl.value !== retypedPasswordControl.value) {
        retypedPasswordControl.setErrors({passwordMismatch: true});
      } else {
        retypedPasswordControl.setErrors(null);
      }
    }


  }
  
}
