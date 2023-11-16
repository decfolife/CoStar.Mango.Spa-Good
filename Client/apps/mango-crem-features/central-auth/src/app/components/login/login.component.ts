import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { UserAuth } from '@mango/data-models/lib-data-models';
import { TextFieldModule } from '@mango/ui-shared/cosmos';
import { CardModule, IconModule } from '@mango/ui-shared/lib-ui-elements';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CentralAuthURLService } from '../../services/url.service';
import { noWhitespaceValidator } from '../reset-password/password-validator';

@Component({
  selector: 'mango-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    RouterModule,
    TextFieldModule,
    MatCardModule,
    MatButtonModule,
    IconModule
  ],
  providers: [CentralAuthURLService]
})
export class LoginComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;

  loginForm: UntypedFormGroup

  formControls: any
  user$: Observable<UserAuth>
  showSSOButton$: Observable<boolean>
  SSOUri$: Observable<string>
  isClientSiteActive$: Observable<boolean>
  showPassword = false;

  subs: Subscription[] = []

  constructor(
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder,
    private urlService: CentralAuthURLService,
    private centralAuthFacade: CentralAuthFacade,
  ) {
    this.user$ = this.centralAuthFacade.user$
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, noWhitespaceValidator]],
    });
    this.formControls = this.loginForm.controls
    this.showSSOButton$ = this.centralAuthFacade.ssoSettings$.pipe(filter(ssoSettings => !!ssoSettings), map(ssoSettings => !ssoSettings.forceSSO && ssoSettings.isSSOEnabled));
    this.SSOUri$ = this.centralAuthFacade.ssoSettings$.pipe(filter(ssoSettings => !!ssoSettings), map(ssoSettings => ssoSettings.ssoUri));
    this.isClientSiteActive$ = combineLatest([this.centralAuthFacade.isClientSpecificLogin$, this.centralAuthFacade.ssoSettings$]).pipe(
      map(([isClientSpecificLogin, ssoSettings]) => !isClientSpecificLogin || isClientSpecificLogin && !!ssoSettings)
    );
    this.loading$ = this.centralAuthFacade.loading$
  }


  ngOnInit(): void {
    this.centralAuthFacade.handleUserAlreadyLoggedIn()
    this.subs.push(this.customerSpecificLoginHandler().subscribe())
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
    const isValid = this.validateForm()
    if (isValid) {
      const credentials = {
        email: this.formControls.email.value,
        password: this.formControls.password.value,
        clientKey: this.urlService.readClientSiteRouteParam()
      };
      this.centralAuthFacade.login(credentials)
    }
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

  customerSpecificLoginHandler(): Observable<any> {
    return of(this.urlService.readClientSiteRouteParam())
      .pipe(
        filter(clientKey => !!clientKey),
        tap(_ => this.centralAuthFacade.setClientSpecificLogin(true)),
        tap(clientKey => this.centralAuthFacade.setSelectedClientKey(clientKey)),
        tap(clientKey => this.centralAuthFacade.getClientSSOSetings(clientKey)),
      )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
