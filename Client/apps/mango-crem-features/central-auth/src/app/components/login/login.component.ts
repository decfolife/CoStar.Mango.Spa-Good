import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService, UserService } from '@mango/core-shared';
import { CentralAuthError, CentralAuthErrorCodes, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE, UserAuth } from '@mango/data-models/lib-data-models';
import { EMPTY, Observable, Subscription, combineLatest, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CentralAuthURLService } from '../../services/url.service';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { noWhitespaceValidator } from '../reset-password/password-validator';

@Component({
  selector: 'mango-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [CentralAuthURLService]
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() loggedInUser: EventEmitter<UserAuth> = new EventEmitter<UserAuth>()
  @ViewChild(ContactSelectComponent) contactSelectComponent: ContactSelectComponent

  loading = false;
  loginForm: UntypedFormGroup;
  isErrored = false;
  showSSOButton = false;
  SSOUri: string;
  showPassword = false;
  isClientSiteActive = true;

  isClientSpecificLoginPage = false;

  subs: Subscription[] = []

  get form() { return this.loginForm.controls; }

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    private router: Router,
    private _route: ActivatedRoute,
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder,
    private urlService: CentralAuthURLService,
    private centralAuthFacade: CentralAuthFacade,
  ) { }

  ngOnInit() {
    this.handleSSOClient().subscribe()

    this.createLoginForm()

    const auth = this._route.snapshot.queryParamMap.get('auth')
    const forcelogout = this._route.snapshot.queryParamMap.get('caforcelogout')

    if (auth === 'false') {
      this.centralAuthFacade.logout()
      throw new CentralAuthError({
        message: UNEXPECTED_ERROR_MESSAGE,
        title: 'Error',
        errorType: MangoErrorTypes.FATAL,
        errorCode: CentralAuthErrorCodes.InternalError
      })
    }

    if (forcelogout === 'true') {
      this.centralAuthFacade.logout()
      throw new CentralAuthError({
        message: USER_LOGGED_OUT_ERROR_MESSAGE,
        title: 'Error',
        errorType: MangoErrorTypes.FATAL,
        errorCode: CentralAuthErrorCodes.ForceLogout
      })
    }

    this.subs.push(combineLatest([this.centralAuthFacade.user$, this.centralAuthFacade.isUserAuthenticated$]).pipe(
      filter(([user, isUserFullyAuthenticated]) => !!user),
      switchMap(([user, isUserFullyAuthenticated]) => {
        if (user?.isServiceAccount) {
          return of(this.router.navigate(['service-account-configuration']))
        }
        if (user.hasMultipleSites && !isUserFullyAuthenticated) {
          return of(this.router.navigate(['customer-selection']))
        }
        return of(EMPTY)
      })
    ).subscribe())

  }


  handleSSOClient(): Observable<any> {
    const clientKey = this.urlService.readClientSiteRouteParam()
    if (!!clientKey) {
      this.isClientSpecificLoginPage = true
      return this.settingsService.getClientSsoSettings(clientKey).pipe(
        tap(response => {
          if (response.forceSSO && response.isSSOEnabled) {
            window.location.href = response.ssoUri
          } else if (!response.forceSSO && response.isSSOEnabled) {
            this.showSSOButton = true
            this.SSOUri = response.ssoUri
          }
        })
      )
    } else {
      return of(EMPTY)
    }
  }

  redirectToSSO = () => {
    window.location.href = this.SSOUri
  };

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, noWhitespaceValidator]],
    });
  }

  toggleShow = () => {
    this.showPassword = !this.showPassword
  };

  getEmailErrorMsg() {
    return this.form.email.errors?.email || this.form.email.errors?.required ? 'Email is not valid' : null
  };

  resetPassword() {
    this.router.navigate(['password-reset-request'])
  }

  login() {
    this.caErrorHandler.clearNotification()
    this.form.email.markAsTouched()
    this.form.password.markAsTouched()

    this.loading = true

    const isValid = this.validateForm()
    if (!isValid) {
      this.loading = false
      this.isErrored = true
      return;
    }

    const credentials = {
      email: this.form.email.value,
      password: this.form.password.value,
      clientKey: this.urlService.readClientSiteRouteParam()
    };

    this.subs.push(this.userService.login(credentials).pipe(
      filter(user => !!user),
      tap(user => this.loginSuccess(user))
    ).subscribe(() => { }, _ => {
      this.loading = false
      this.isErrored = true
    }))
  };

  loginSuccess(user: UserAuth): void {
    this.loading = false
    this.isErrored = false
    this.centralAuthFacade.setUser(user)
    this.centralAuthFacade.setAccessToken(user.authToken)
    this.loggedInUser.emit(user)
    //return this.handleCustomerSpecificLogin()
  }

  // If user is coming in through general login page AND only has 1 user site
  // If user is coming in through customer specific login page
  handleCustomerSpecificLogin(): Observable<any> {
    /*const selectedUser = this.userService.currentUserValue
    return this.userService.getClientSitesByUser(selectedUser.email).pipe(
      filter(clientSites => !!clientSites),
      map((clientSites: ClientSitesByUser) => clientSites.userSites.find(c => c.clientKey.toLowerCase() === selectedUser.clientKey.toLowerCase())),
      switchMap((selectedClient: UserSite) => {
        this.userService.setSelectedSite(selectedClient)
        return this.contactSelectComponent.loadClientContactRecords(selectedUser.clientKey, !this.isClientSpecificLoginPage)
      })
    )*/
    return of()
  }

  validateForm(): boolean {
    return (this.form.email.errors?.required && this.form.password.errors?.required) || (this.form.email.errors?.required || this.form.email.errors?.email) || (this.form.password.errors?.required) || (this.form.password.errors?.whitespace) ? false : true
  }

  getPasswordErrorMsg = () => {
    if (this.form.password.errors?.required && this.form.password.touched) {
      return 'Password is required';
    }
    else if (this.form.password.touched && this.form.password.errors?.whitespace) {
      return 'Password is not valid';
    }
  };

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
