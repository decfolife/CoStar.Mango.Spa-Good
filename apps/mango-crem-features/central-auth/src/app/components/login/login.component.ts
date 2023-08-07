import { Component, EventEmitter, OnDestroy, OnInit, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, SettingsService, StorageService, DBkeys } from '@mango/core-shared';
import { CentralAuthHttpError, CentralAuthError, ClientSitesByUser, MangoErrorTypes, CentralAuthErrorCodes, UNEXPECTED_ERROR_MESSAGE, USER_LOGGED_OUT_ERROR_MESSAGE, UserAuth, ContactRecord } from '@mango/data-models/lib-data-models';
import { AuthenticationService } from '../../services/authentication.service';
import { ContactSelectComponent } from '../contact-select/contact-select.component';
import { CentralAuthURLService } from '../../services/url.service';
import { Subscription } from 'rxjs';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { noWhitespaceValidator } from '../reset-password/password-validator';
import { CentralAuthFacade } from '../../+state/facades';
import { filter, map, switchMap } from 'rxjs/operators';

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

  public loading = false;
  public loginForm: UntypedFormGroup;
  public isErrored = false;
  public showSSOButton = false;
  public SSOUri: string;
  public showPassword = false;
  public isClientSiteActive = true;
  
  isClientSpecificLoginPage = false;

  subs: Subscription[] = []

  get form() { return this.loginForm.controls; }

  constructor(
    private userService: UserService,
    private settingsService: SettingsService,
    protected authentication: AuthenticationService,
    private router: Router,
    private _route: ActivatedRoute,
    private caErrorHandler: CentralAuthErrorHandler,
    private fb: UntypedFormBuilder,
    private urlService: CentralAuthURLService,
    private storageService: StorageService,
    private centralAuthFacade: CentralAuthFacade,
    @Optional() private facade: MangoAppFacade
  ) { }

  ngOnInit() {
    this.createForm()

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

    this.centralAuthFacade.isUserAuthenticated$.subscribe(isUserFullyAuthenticated => {
      const currentUser = this.userService.currentUserValue
      if (currentUser?.isAutoProvisioned || isUserFullyAuthenticated) {
        this.router.navigate(['customer-selection'], { relativeTo: this._route })
      }
    })

    this.getClientSsoSettings()
  }


  getClientSsoSettings() {
    const clientKey = this.urlService.readClientSiteRouteParam()

    if (!clientKey) {
      this.isClientSpecificLoginPage = false
      return;
    }

    this.isClientSpecificLoginPage = true

    this.settingsService.getClientSsoSettings(clientKey).subscribe(
      (result) => {
        if (result.forceSSO && result.isSSOEnabled) {
          window.location.href = result.ssoUri
        } else if (!result.forceSSO && result.isSSOEnabled) {
          this.showSSOButton = true
          this.SSOUri = result.ssoUri
        }
      },
      (error: CentralAuthHttpError) => {
        this.isErrored = true
        this.isClientSiteActive = false
      }
    );
  }

  redirectToSSO = () => {
    window.location.href = this.SSOUri
  };

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, noWhitespaceValidator]],
    });
  }

  toggleShow = () => {
    this.showPassword = !this.showPassword
  };

  getEmailErrorMsg = () => {
    if (this.form.email.errors?.email) {
      return 'Email is not valid'
    }
    else if (this.form.email.errors?.required) {
      return 'Email is required'
    }
  };

  hasValue = () => {
    return !this.loginForm.get('password').hasError('required')
  };

  public resetPassword() {
    this.router.navigate(['password-reset-request'], { relativeTo: this._route })
  }

  login = () => {
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
    
    this.userService.login(credentials).subscribe(
      () => this.loginSuccess(),
      (error: CentralAuthHttpError) => {
        this.loading = false
        this.isErrored = true
      }
    );

  };

  private loginSuccess() {
    this.subs.push(this.userService.isAuthenticated.pipe(
      filter(isUserAuthenticated => !!isUserAuthenticated),
      switchMap(_ => this.centralAuthFacade.isUserAuthenticated$),
      map(async isUserFullyAuthenticated => {
        const user = this.userService.currentUserValue
        this.loggedInUser.emit(user)
        this.loading = false
        this.isErrored = false 
        if (user.hasMultipleSites && !isUserFullyAuthenticated) {
          this.router.navigate(['customer-selection'], { relativeTo: this._route })
          return
        }
        await this.handleCustomerSpecificLogin()
      })
    ).subscribe())
  }

  // If user is coming in through general login page AND only has 1 user site
  // If user is coming in through customer specific login page
  async handleCustomerSpecificLogin() {
    const selectedUser = this.userService.currentUserValue

    this.subs.push(this.userService.getClientSitesByUser(selectedUser.email).subscribe(async (clientSites: ClientSitesByUser) => {
      const selectedClient = clientSites.userSites.find(c => c.clientKey.toLowerCase() === selectedUser.clientKey.toLowerCase())
      this.userService.setSelectedSite(selectedClient)
      await this.contactSelectComponent.loadClientContactRecords(selectedUser.clientKey, !this.isClientSpecificLoginPage)
    }))
  }

  private validateForm(): boolean {
    let isValid = true

    if (this.form.email.errors?.required && this.form.password.errors?.required) {
      isValid = false
    } else if (this.form.email.errors?.required || this.form.email.errors?.email) {
      isValid = false
    } else if (this.form.password.errors?.required) {
      isValid = false
    } else if (this.form.password.errors?.whitespace) {
      isValid = false
    }

    return isValid
  }

  getPasswordErrorMsg = () => {
    if (this.form.password.errors?.required && this.form.password.touched) {
      return 'Password is required';
    }
    else if (this.form.password.touched && this.form.password.errors?.whitespace) {
      return 'Password is not valid';
    }
  };

  contactRecordEvent(contactRecord: ContactRecord): void {
    this.storageService.savePermanentData(contactRecord, DBkeys.CONTACT_RECORD)
    this.settingsService.contactRecord$.next(contactRecord)
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
