import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { debounceTime, tap } from "rxjs/operators";
import { ButtonModule } from "../button";
import { DatePickerModule } from "../date-picker";
import { DropdownModule } from "../dropdown";
import { InputComponent } from "../input";
import { CremFormsModule } from "./forms.module";


/**
 * For a detailed examples on how to use Crem Forms, check the file libs\ui-shared\lib-ui-elements\src\lib\form\forms.demo.component.ts
 * @class CremFormsDemo
 */
@Component({
  selector: 'crem-forms-demo',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CremFormsModule,
    InputComponent,
    ButtonModule,
    DropdownModule,
    DatePickerModule
  ],
  templateUrl: './forms.demo.component.html',
  styleUrls: ['./forms.demo.component.scss'],
})
export class CremFormsDemoComponent implements OnInit {

  /**
  * @ignore
  */
  @Input() formExample: string

  /**
  * @ignore
  */
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    fullName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('01/01/2024'),
    country: new FormControl(''),
    phoneNumber: new FormControl(''),
  })

  /**
  * @ignore
  */
  layoutFormInline = new FormGroup({
    fieldA: new FormControl('', [Validators.required]),
    fieldB: new FormControl('', [Validators.required]),
  })

  /**
  * @ignore
  */
  layoutFormVertical = new FormGroup({
    fieldA: new FormControl('', [Validators.required]),
    fieldB: new FormControl('', [Validators.required]),
  })

  /**
  * @ignore
  */
  layoutFormHorizontal = new FormGroup({
    fieldA: new FormControl('', [Validators.required]),
    fieldB: new FormControl('', [Validators.required]),
  })

  /**
  * @ignore
  */
  labelAlignmentFormLeft = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  })

  /**
  * @ignore
  */
  labelAlignmentFormRight = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  })


  /**
   * @ignore
  */
  ngOnInit(): void {
    this.registerForm.valueChanges.pipe(
      debounceTime(300),
      tap(change => {
        console.log('**********************')
        console.log('New change to the form', change)
        console.log('Current form status', this.registerForm.status)
        console.log('Is form valid?', this.registerForm.valid)
      })).subscribe()
  }

  /**
  * @ignore
  */
  registerFormSubmit() {
    if (!this.registerForm.valid) {
      console.log('Submission failed: the form is invalid')
    } else {
      console.log('The form has been submitted')
    }
  }
}