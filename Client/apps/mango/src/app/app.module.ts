import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Environment, IS_CA_STANDALONE_APP, OAUTH_REDIRECT_QUERY_PARAM, RUNNING_IN_MANGO_SPA } from '@mango/data-models/lib-data-models';
import { environment } from '../environments/environment.local';
import {
  HeaderService,
  LibCoreSharedModule,
  NotificationService,
  StorageService,
  UserService,
} from '@mango/core-shared';
import { AppService } from './app.service';
import { ToastrModule } from 'ngx-toastr';
import { LibExternalLibrariesModule } from '@mango/ui-shared/lib-external-libraries';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { BookmarksService } from '../../../mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { CentralAuthErrorHandler } from 'apps/mango-crem-features/central-auth/src/app/services/error-handler.service';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './+state/app/app.reducer';
import { MangoAppFacade } from './+state/app/app.facade';
import { AppRoutingModule } from './app-routing.module';
import { CremModule } from './components/crem-component/crem.module';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { CustomSerializer } from './utils/custom-route-serializer';
import { AuthenticationEffects } from './+state/app/effects/authentication.effects';
import { InitSetupEffects } from './+state/app/effects/init-setup.effects';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NavigationEffect } from './+state/app/effects/navigation.effects';
import { MangoNavigationService } from './services/navigation.service';
import { CremHttpInterceptor } from './helpers/crem-http.interceptor';
import { CSPModuleInlineStyles } from './utils/content-security-policies/inline-styles';
import { NavigationStart, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { RouterEvent } from '@angular/router';
import { combineLatest, of } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
  ],
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
      NavigationEffect
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
      serializer: CustomSerializer
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
    MangoNavigationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router, private facade: MangoAppFacade) {
    this.router.events.pipe(
      filter((e: RouterEvent) => e instanceof NavigationStart && e.url.includes('/v06')),
      switchMap(e => combineLatest([of(e.url), this.facade.clientKey$])),
      filter(([url, clientKey]) => !!url && !!clientKey),
      map(([url, clientKey]) => {
        const newUrl = url.includes('AdminHome2.aspx') ? `${environment.CAUrl}oauth/authorize?${OAUTH_REDIRECT_QUERY_PARAM}=${environment.cremBaseUrl.replace('[CLIENT]', clientKey)}/v06/login.aspx?ReturnUrl=${encodeURIComponent(url)}` : `${environment.cremBaseUrl.replace('[CLIENT]', clientKey)}${url}`
        window.location.href = newUrl
      })
    ).subscribe()
  }
}
