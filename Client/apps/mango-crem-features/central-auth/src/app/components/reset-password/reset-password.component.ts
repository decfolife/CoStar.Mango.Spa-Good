import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '@mango/core-shared';
import { CentralAuthHttpError, PasswordRequirements } from '@mango/data-models/lib-data-models';
import { noWhitespaceValidator, passwordMatchValidator } from './password-validator';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;

  public isErrored: boolean = false;
  public errorMessage = '';
  public isValidPassword: boolean = false;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public showPopover: boolean = false;
  public resetPasswordForm: UntypedFormGroup;
  public passwordRequirements: PasswordRequirements;
  public userEmail: string;
  public resetToken: string;

  // convenience getter for easy access to form fields
  get form() { return this.resetPasswordForm.controls; }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.validateResetToken()
    this.createForm();
  }

  validateResetToken() {
    this.resetToken = this._route.snapshot.queryParamMap.get('token');

    if (!this.resetToken) {
      this._router.navigateByUrl('/password-reset-request');
      return;
    }

    this._userService.validateTokenAndGetPasswordRequirements(this.resetToken).subscribe(
      (response) => {
        this.passwordRequirements = response.passwordRequirements;
        this.userEmail = response.userEmail;
      },
      (error: CentralAuthHttpError) => {
        this._router.navigateByUrl('/password-reset-request?expiredToken=true');
      }
    )
  }

  onStrengthChanged(strength: number) {
    if (strength === 100) {
      this.isValidPassword = true;
    }
    else {
      this.isValidPassword = false;
    }
  }

  createForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, noWhitespaceValidator]],
      confirmPassword: ['', Validators.required],
    }, { validator: passwordMatchValidator });
  }

  resetPassword = () => {
    this.caErrorHandler.clearNotification()
    this.isLoading = true;
    this.form.password.markAsTouched();
    this.form.confirmPassword.markAsTouched();

    var isValid = this.validateForm();
    if (!isValid) {
      this.isLoading = false;
      this.isErrored = true;
      return;
    }

    var credentials = {
      email: this.userEmail,
      resetToken: this.resetToken,
      password: this.form.password.value,
      confirmPassword: this.form.confirmPassword.value
    };

    this._userService.resetPassword(credentials).subscribe(
      (results) => {
        this._router.navigateByUrl('/');
      },
      (error: CentralAuthHttpError) => {
        this.isLoading = false;
        this.isErrored = true;

        throw error
      }
    );
  };

  hasValue = (field: string) => {
    return !this.resetPasswordForm.get(field).hasError('required');
  };

  toggleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  toggleShowConfirmPassword = () => {
    this.showConfirmPassword = !this.showConfirmPassword;
  };

  togglePopover() {
    this.showPopover = true;
  }

  getPasswordErrorMsg = () => {
    if (this.form.password.errors?.required && this.form.password.touched) {
      return 'Password is required';
    }
    else if (!this.isValidPassword && this.form.password.touched && !this.form.password.errors?.required) {
      return 'Password is not valid';
    }
  };

  getConfirmPasswordErrorMsg = () => {
    if (this.form.confirmPassword.touched) {
      if (this.resetPasswordForm.errors?.passwordMismatch && this.isValidPassword) {
        return "Passwords don't match";
      }
      else if (this.form.confirmPassword.errors?.required && !this.isValidPassword) {
        return 'Confirm password is required';
      }
    }
  };

  private validateForm(): boolean {
    var isValid = true;

    if (this.form.password.errors?.required && this.form.confirmPassword.errors?.required) {
      isValid = false;
      this.isValidPassword = false;
    }
    else if (this.form.password.errors?.required) {
      isValid = false;
      this.isValidPassword = false;
    }
    else if (this.form.password.errors?.whitespace) {
      isValid = false
      this.isValidPassword = false
    }
    else if (this.form.confirmPassword.errors?.required) {
      isValid = false;
    }
    else if (!this.isValidPassword) {
      isValid = false;
      this.isValidPassword = false;
    }
    else if (this.resetPasswordForm.controls.password.value != this.resetPasswordForm.controls.confirmPassword.value) {
      isValid = false;
    }

    return isValid;
  }
}
