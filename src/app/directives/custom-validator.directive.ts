import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appCustomValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CustomValidatorDirective,
    multi: true
  }]
})
export class CustomValidatorDirective implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    if ((control.value?.length > 0 && control.value?.length < 4) || !(/[a-zA-Z0-9]/.test(control.value))) {
      return { 'searchTextInvalid': true };
    }
    return null;
  }
}
