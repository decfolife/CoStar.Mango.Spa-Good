import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authenticate, Errors } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  title: String = '';
  @Input() errors: Errors = { errors: {} };
  @Input() isSubmitting = false;
  authForm: FormGroup;

  @Output() childSubmit = new EventEmitter<Authenticate>();

  constructor(private fb: FormBuilder) {
    // use FormBuilder to create a form group
    // hard coded for now... because I'm lazy =)
    this.authForm = this.fb.group({
      emailAddress: ['mcurtis@costargroup.com', Validators.required],
      password: ['123456!', Validators.required],
    });
  }

  login(authenticate: Authenticate) {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    this.childSubmit.emit(authenticate);
  }
}
