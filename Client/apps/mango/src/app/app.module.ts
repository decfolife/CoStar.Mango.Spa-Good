import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import {
  HeaderService,
  LibCoreSharedModule,
  NotificationService,
  StorageService,
  UserService,
} from '@mango/core-shared';
import {
  CREM_FORCE_RELOGIN_URLS,
  Environment,
  IS_CA_STANDALONE_APP,
  OAUTH_CLIENT_KEY_QUERY_PARAM,
  OAUTH_CONTACT_ID_QUERY_PARAM,
  OAUTH_REDIRECT_QUERY_PARAM,
  RUNNING_IN_MANGO_SPA,
} from '@mango/data-models/lib-data-models';
import { LibExternalLibrariesModule } from '@mango/ui-shared/lib-external-libraries';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CentralAuthErrorHandler } from 'apps/mango-crem-features/central-auth/src/app/services/error-handler.service';
import { ToastrModule } from 'ngx-toastr';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { BookmarksService } from '../../../mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { environment } from '../environments/environment.local';
import { MangoAppFacade } from './+state/app/app.facade';
import * as fromApp from './+state/app/app.reducer';
import { AuthenticationEffects } from './+state/app/effects/authentication.effects';
import { InitSetupEffects } from './+state/app/effects/init-setup.effects';
import { NavigationEffect } from './+state/app/effects/navigation.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { CremModule } from './components/crem-component/crem.module';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { MangoNavigationService } from './services/navigation.service';
import { CSPModuleInlineStyles } from './utils/content-security-policies/inline-styles';
import { CustomSerializer } from './utils/custom-route-serializer';
import { GlobalSessionEffects } from './+state/app/effects/global-session.effects';
import { ValidateComponent } from './components/auth/validate/validate.component';
import { contactRecord } from './+state/app/app.selectors';

@NgModule({
  declarations: [AppComponent, LoadingScreenComponent, ValidateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(fromApp.APP_FEATURE_KEY, fromApp.reducer),
    EffectsModule.forFeature([
      AuthenticationEffects,
      InitSetupEffects,
      NavigationEffect,
      GlobalSessionEffects,
    ]),
    StoreDevtoolsModule.instrument(),
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    CremModule,
    LibUiSharedModule,
    LibCoreSharedModule,
    LibExternalLibrariesModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    }),
    MatPasswordStrengthModule.forRoot(),
    CSPModuleInlineStyles,
  ],
  providers: [
    { provide: Environment, useValue: environment },
    // { provide: HTTP_INTERCEPTORS, useClass: CremHttpInterceptor, multi: true },
    { provide: IS_CA_STANDALONE_APP, useValue: false },
    { provide: RUNNING_IN_MANGO_SPA, useValue: true },
    AppService,
    BookmarksService,
    UserService,
    NotificationService,
    StorageService,
    ProjectsDashboardLeftNavService,
    CentralAuthErrorHandler,
    MangoAppFacade,
    HeaderService,
    MangoNavigationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router, private facade: MangoAppFacade) {
    this.router.events
      .pipe(
        filter(
          (e: RouterEvent) =>
            e instanceof NavigationStart && e.url.includes('.asp')
        ),
        switchMap((e) => combineLatest([of(e.url), this.facade.clientKey$, this.facade.contactRecord$])),
        filter(([url, clientKey]) => !!url && !!clientKey && !!contactRecord),
        map(([url, clientKey, contactRecord]) => {
          if (url.includes('RenderForm')) {
            const queryParams = url.split('?');
            this.router.navigateByUrl(
              `/crem/forms/render-form?${queryParams[1]}`
            );
          } else {
            const forceRelogin = CREM_FORCE_RELOGIN_URLS.some((subUrl) =>
              url.includes(subUrl)
            );
            const newUrl = forceRelogin
              ? `${
                  environment.CAUrl
                }?${OAUTH_CLIENT_KEY_QUERY_PARAM}=${clientKey}&${OAUTH_CONTACT_ID_QUERY_PARAM}=${contactRecord.contactID}&${OAUTH_REDIRECT_QUERY_PARAM}=${environment.cremBaseUrl.replace(
                  '[CLIENT]',
                  clientKey
                )}/v06/login.aspx?ReturnUrl=${encodeURIComponent(url)}`
              : `${environment.cremBaseUrl.replace(
                  '[CLIENT]',
                  clientKey
                )}${url}`;
            window.location.href = newUrl;
          }
        })
      )
      .subscribe();
  }
}
