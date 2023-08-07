import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@mango/core-shared';
import { CentralAuthError, MangoErrorTypes, CentralAuthErrorCodes, CentralAuthHttpError } from '@mango/data-models/lib-data-models';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';

@Component({
  selector: 'mango-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PasswordResetRequestComponent implements OnInit {
  public isLoading = false;
  public show = true;
  public resetPasswordRequestForm: UntypedFormGroup;
  public isErrored = false;
  public isValidEmail = true;
  public requestHasBeenSent = false;

  private readonly emailSentInstructions = 'If the email address was valid, then an email will be sent from support@costarremanager.com with a link to reset your password.';
  private readonly resetPasswordRequestInstructions = 'Enter your email address and we\'ll send a link to change your password.';
  private readonly resetLinkExpiredMessage = 'Your reset link has expired. Please enter your email address and submit a new request.';

  get form() { return this.resetPasswordRequestForm.controls; }

  constructor(
    private userService: UserService,
    protected authentication: AuthenticationService,
    private router: Router,
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.queryParams
      .subscribe(params => {
        if (this.toBoolean(params.expiredToken)) {
          throw new CentralAuthError({
            message: this.resetLinkExpiredMessage,
            title: 'Warning',
            errorType: MangoErrorTypes.WARNING,
            errorCode: CentralAuthErrorCodes.ResetLinkExpired
          })
        }
      }
      );
  }

  createForm() {
    this.resetPasswordRequestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleShow = () => {
    this.show = !this.show;
  };

  sendResetRequest = () => {
    this.caErrorHandler.clearNotification()
    this.form.email.markAsTouched();
    this.isLoading = true;

    if (!this.validateForm()) {
      this.isLoading = false;
      this.isErrored = true;
      return;
    }

    const request = {
      email: this.resetPasswordRequestForm.controls.email.value
    };

    this.userService.requestPasswordReset(request).subscribe(
      () => this.sendRequestSuccess(),
      (error) => this.sendRequestFailed(error)
    );
  };

  public getInstructions(): string {
    return (this.requestHasBeenSent) ? this.emailSentInstructions : this.resetPasswordRequestInstructions;
  }

  private sendRequestSuccess() {
    this.isLoading = false;
    this.isErrored = false;
    this.requestHasBeenSent = true;
  }

  private sendRequestFailed(error: CentralAuthHttpError) {
    this.requestHasBeenSent = false;
    this.isLoading = false;
    this.isErrored = true;
  }

  private validateForm(): boolean {
    this.isValidEmail = true;

    if (this.resetPasswordRequestForm.get('email').hasError('required') ||
      this.resetPasswordRequestForm.get('email').hasError('email')) {
      this.isValidEmail = false;
    }

    return this.isValidEmail;
  }

  getEmailErrorMsg = () => {
    if (this.form.email.errors?.required && this.form.email.touched) {
      return 'Email is required';
    }
    else if (!this.isValidEmail && this.form.email.touched && !this.form.email.errors?.required) {
      return 'Email is not valid';
    }
  };

  public navigateToLoginPage() {
    this.caErrorHandler.clearNotification()
    this.router.navigate(['/']);
  }

  private toBoolean(value: string): boolean {
    if (!value) return false;

    return value.toUpperCase() == 'TRUE' || value.toUpperCase() == 'YES' || value == '1';
  }
}
