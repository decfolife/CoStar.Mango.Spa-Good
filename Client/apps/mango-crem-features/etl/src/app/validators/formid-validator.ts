import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check if the formId is 0
export function notZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === 0 ? { notZero: true } : null;
  };
}
