import{ValidatorFn, AbstractControl} from '@angular/forms';

export function CheckPasswordValidator(p1: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = p1!=control.value;
        return forbidden ? {'checkPassword': {value: true}} : null;
      };
}