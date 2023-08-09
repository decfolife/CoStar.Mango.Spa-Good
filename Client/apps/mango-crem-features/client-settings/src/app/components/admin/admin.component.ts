import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SettingsService } from '@mango/core-shared';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ClientSettings } from '@mango/data-models/lib-data-models';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-client-settings-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  isErrored: boolean = false;
  errorMessage = '';
  readonly minPasswordLength = 12;
  readonly maxPasswordLength = 200;
  passwordLength = 0;
  readonly minPasswordExpireDays = 1;
  readonly maxPasswordExpireDays = 90;
  passwordExpireDays = 0;
  ssoSettingsForm: UntypedFormGroup;

  // convenience getter for easy access to form fields
  get form() { return this.ssoSettingsForm.controls; }

  subs: Subscription[] = []

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _settingsService: SettingsService,
    private _toastr: ToastrService,
    private fb: UntypedFormBuilder,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'client-settings');
  }

  ngOnInit() {
    this.isLoading = true
    this.passwordLength = this.minPasswordLength;
    this.passwordExpireDays = this.minPasswordExpireDays;
    this.createForm();
    this.getClientSettings();
  }

  createForm() {
    this.ssoSettingsForm = this.fb.group({
      isSSOEnabled: [false],
      forceSSO: [false],
      ssoStageUri: [''],
      ssoProdUri: [''],
      ssoStageLogoutUri: [''],
      ssoProdLogoutUri: [''],
    });
  }

  getClientSettings() {
    this.isLoading = true
    this.subs.push(this._settingsService.getClientSettings().subscribe(
      (result) => {
        this.isLoading = false
        this.passwordLength = result.PasswordMinLength;
        this.passwordExpireDays = result.PasswordExpiresInDays;
        this.form.isSSOEnabled.setValue(result.IsSSOEnabled);
        this.form.ssoStageUri.setValue(result.SSOStageUri);
        this.form.ssoProdUri.setValue(result.SSOProdUri);
        this.form.ssoStageLogoutUri.setValue(result.SSOStageLogoutUri);
        this.form.ssoProdLogoutUri.setValue(result.SSOProdLogoutUri);
        this.form.forceSSO.setValue(result.ForceSSO);
      },
      () => {
        this.isErrored = true;
      }
    ));
  }

  launchSSOsite(uri: string) {
    window.open(uri, "_blank");
  }

  saveSettings(): void {
    const formData: ClientSettings = this.buildClientSettingsPayload()
    this.isLoading = true
    this.subs.push(this._settingsService.clientKey$.pipe(
      switchMap(clientKey => {
        formData['clientKey'] = clientKey
        return this._settingsService.saveClientSettings(formData)
      })
    ).subscribe(response => {
      this.isLoading = false
      if (response.StatusCode === 200) {
        this._toastr.success("Settings saved successfully")
      }
    }, (_ => {
      this.isLoading = false
    })))
  }

  buildClientSettingsPayload(): ClientSettings {
    return { ...this.ssoSettingsForm.value, passwordMinLength: this.passwordLength, passwordExpiresInDays: this.passwordExpireDays, isActive: true }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}
