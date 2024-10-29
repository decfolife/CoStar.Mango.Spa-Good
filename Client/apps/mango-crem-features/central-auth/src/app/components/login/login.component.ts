import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TextFieldModule } from '@mango/ui-shared/cosmos';
import { CardModule, IconModule } from '@mango/ui-shared/lib-ui-elements';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CentralAuthURLService } from '../../services/url.service';
import { noWhitespaceValidator } from '../reset-password/password-validator';
import { ContactRecordsPopupComponent } from '../contact-records-popup/contact-records-popup.component';
import { StorageService } from '@mango/core-shared';
import { UserAuth } from '../../models/userAuth';

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
    IconModule,
    ContactRecordsPopupComponent,
  ],
  providers: [CentralAuthURLService, CentralAuthErrorHandler],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading$: Observable<boolean>;
  loginForm: UntypedFormGroup;
  formControls: any;
  user$: Observable<UserAuth>;
  showSSOButton$: Observable<boolean>;
  SSOUri$: Observable<string>;
  isClientSiteActive$: Observable<boolean>;
  isClientSpecificLogin$: Observable<boolean>;
  showPassword = false;

  subs: Subscription[] = [];

  constructor(
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder,
    private urlService: CentralAuthURLService,
    private centralAuthFacade: CentralAuthFacade,
    private storageService: StorageService
  ) {
    this.user$ = this.centralAuthFacade.user$;
    this.isClientSpecificLogin$ = this.centralAuthFacade.isClientSpecificLogin$;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, noWhitespaceValidator]],
    });
    this.formControls = this.loginForm.controls;
    this.showSSOButton$ = this.centralAuthFacade.ssoSettings$.pipe(
      filter((ssoSettings) => !!ssoSettings),
      map((ssoSettings) => !ssoSettings.forceSSO && ssoSettings.isSSOEnabled)
    );
    this.SSOUri$ = this.centralAuthFacade.ssoSettings$.pipe(
      filter((ssoSettings) => !!ssoSettings),
      map((ssoSettings) => ssoSettings.ssoUri)
    );
    this.isClientSiteActive$ = combineLatest([
      this.centralAuthFacade.isClientSpecificLogin$,
      this.centralAuthFacade.ssoSettings$,
    ]).pipe(
      map(
        ([isClientSpecificLogin, ssoSettings]) =>
          !isClientSpecificLogin || (isClientSpecificLogin && !!ssoSettings)
      )
    );
    this.loading$ = this.centralAuthFacade.loading$;
  }

  ngOnInit(): void {
    this.centralAuthFacade.handleUserAlreadyLoggedIn();
    this.subs.push(this.clientSpecificLoginHandler().subscribe());
  }

  redirectToSSO = () => {
    this.SSOUri$.pipe(
      tap((ssoUri) => (window.location.href = ssoUri))
    ).subscribe();
  };

  toggleShow = () => {
    this.showPassword = !this.showPassword;
  };

  getEmailErrorMsg() {
    return this.formControls.email.errors?.email ||
      this.formControls.email.errors?.required
      ? 'Email is not valid'
      : null;
  }

  login() {
    this.caErrorHandler.clearNotification();
    this.formControls.email.markAsTouched();
    this.formControls.password.markAsTouched();
    const isValid = this.validateForm();
    if (isValid) {
      const credentials = {
        email: this.formControls.email.value,
        password: this.formControls.password.value,
        clientKey: this.urlService.readClientSiteRouteParam(),
      };
      this.centralAuthFacade.login(credentials);
    }
  }

  contactsPopupCancelled() {
    this.centralAuthFacade.clearState();
    this.subs.push(this.clientSpecificLoginHandler().subscribe());
  }

  validateForm(): boolean {
    return (this.formControls.email.errors?.required &&
      this.formControls.password.errors?.required) ||
      this.formControls.email.errors?.required ||
      this.formControls.email.errors?.email ||
      this.formControls.password.errors?.required ||
      this.formControls.password.errors?.whitespace
      ? false
      : true;
  }

  getPasswordErrorMsg = () => {
    if (
      this.formControls.password.errors?.required &&
      this.formControls.password.touched
    ) {
      return 'Password is required';
    } else if (
      this.formControls.password.touched &&
      this.formControls.password.errors?.whitespace
    ) {
      return 'Password is not valid';
    }
  };

  clientSpecificLoginHandler(): Observable<any> {
    return combineLatest([
      this.centralAuthFacade.loadCurrentUserComplete$,
      of(this.urlService.readClientSiteRouteParam()),
    ]).pipe(
      filter(([finishedLoadingUser, _]) => {
        return finishedLoadingUser;
      }),
      switchMap(([_, clientKey]) =>
        combineLatest([
          of(clientKey),
          this.centralAuthFacade.user$.pipe(take(1)),
        ])
      ),
      // If the user is logged-in, then they must have logged in via the general login page recently, do nothing.
      filter(([clientKey, user]) => {
        return !!clientKey && !user;
      }),
      tap((_) => this.centralAuthFacade.setClientSpecificLogin(true)),
      tap((_) => this.centralAuthFacade.setOpenClientInNewTab(false)),
      tap(([clientKey, _]) =>
        this.centralAuthFacade.setSelectedClientKey(clientKey)
      ),
      tap(([clientKey, _]) =>
        this.centralAuthFacade.getClientSSOSettings(clientKey)
      ),
      tap((_) => this.centralAuthFacade.handleSSOClientLogin())
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
