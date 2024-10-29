import {
  ValidatorFn,
  UntypedFormGroup,
  ValidationErrors,
  UntypedFormControl,
} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  formGroup: UntypedFormGroup
): ValidationErrors | null => {
  if (
    formGroup.get('password').value === formGroup.get('confirmPassword').value
  )
    return null;
  else return { passwordMismatch: true };
};

export function noWhitespaceValidator(control: UntypedFormControl) {
  const isSpace = (control.value || '').match(/\s/g);
  return isSpace ? { whitespace: true } : null;
}
