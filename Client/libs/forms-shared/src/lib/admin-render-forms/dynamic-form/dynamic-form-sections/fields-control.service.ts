import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';


@Injectable()
export class FieldsControlService {
  
  createFormControl(value: any, validators: ValidatorFn[] = []): FormControl {
    return new FormControl(value, validators);
  }

  toFormGroup(fields: any[] ) {
    const group: any = {};

    fields.forEach(field => {
      let formControl: FormControl;
      // Array to hold the conditional validators based on the question properties
      const conditionalValidators: ValidatorFn[] = [];

      // Check and add required validator if necessary
      // if (field.FormItemMandatory != null) {
      //   conditionalValidators.push(Validators.required);
      // }

      // // Check and add minLength validator if necessary
      // if (field.minLength) {
      //   conditionalValidators.push(Validators.minLength(field.minLength));
      // }

      // // Check and add maxLength validator if necessary
      // if (field.FormItemMaximumLength) {
      //   conditionalValidators.push(Validators.maxLength(field.FormItemMaximumLength));
      // }

      // Create the form control with conditional validators
      // eslint-disable-next-line prefer-const
      formControl = this.createFormControl(field[field.SourceColumn], conditionalValidators);
      formControl.disable(); 

      // Assign the form control to the group
      group[field.FormItemID] = formControl;
    });
    
    return new FormGroup(group);
  }
}