import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from '@mango/core-shared';
import { UserAuth } from '@mango/data-models/lib-data-models';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CentralAuthURLService } from '../../services/url.service';
import { noWhitespaceValidator } from '../reset-password/password-validator';

@Component({
  selector: 'mango-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [CentralAuthURLService]
})
export class LoginComponent implements OnDestroy {
  loading = false;

  loginForm: UntypedFormGroup

  formControls: any
  showSSOButton$: Observable<boolean>
  SSOUri$: Observable<string>
  isClientSiteActive$: Observable<boolean>
  showPassword = false;

  subs: Subscription[] = []

  constructor(
    private userService: UserService,
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder,
    private urlService: CentralAuthURLService,
    private centralAuthFacade: CentralAuthFacade,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, noWhitespaceValidator]],
    });;
    this.formControls = this.loginForm.controls
    this.showSSOButton$ = this.centralAuthFacade.ssoSettings$.pipe(filter(ssoSettings => !!ssoSettings), map(ssoSettings => !ssoSettings.forceSSO && ssoSettings.isSSOEnabled));
    this.SSOUri$ = this.centralAuthFacade.ssoSettings$.pipe(filter(ssoSettings => !!ssoSettings), map(ssoSettings => ssoSettings.ssoUri));
    this.isClientSiteActive$ = combineLatest([this.centralAuthFacade.isClientSpecificLogin$, this.centralAuthFacade.ssoSettings$]).pipe(
      map(([isClientSpecificLogin, ssoSettings]) => !isClientSpecificLogin || isClientSpecificLogin && !!ssoSettings)
    );
  }


  redirectToSSO = () => {
    this.SSOUri$.pipe(tap(ssoUri => window.location.href = ssoUri)).subscribe()
  };

  toggleShow = () => {
    this.showPassword = !this.showPassword
  };

  getEmailErrorMsg() {
    return this.formControls.email.errors?.email || this.formControls.email.errors?.required ? 'Email is not valid' : null
  };

  login() {
    this.caErrorHandler.clearNotification()
    this.formControls.email.markAsTouched()
    this.formControls.password.markAsTouched()

    this.loading = true

    const isValid = this.validateForm()
    if (!isValid) {
      this.loading = false
      return;
    }

    const credentials = {
      email: this.formControls.email.value,
      password: this.formControls.password.value,
      clientKey: this.urlService.readClientSiteRouteParam()
    };
    this.centralAuthFacade.login(credentials)
  };

  validateForm(): boolean {
    return (this.formControls.email.errors?.required && this.formControls.password.errors?.required) || (this.formControls.email.errors?.required || this.formControls.email.errors?.email) || (this.formControls.password.errors?.required) || (this.formControls.password.errors?.whitespace) ? false : true
  }

  getPasswordErrorMsg = () => {
    if (this.formControls.password.errors?.required && this.formControls.password.touched) {
      return 'Password is required';
    }
    else if (this.formControls.password.touched && this.formControls.password.errors?.whitespace) {
      return 'Password is not valid';
    }
  };

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
