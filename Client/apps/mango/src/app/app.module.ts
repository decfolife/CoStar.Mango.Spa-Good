import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import {
  AuthService,
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
import { CustomSerializer } from './utils/custom-route-serializer';
import { GlobalSessionEffects } from './+state/app/effects/global-session.effects';
import { ValidateComponent } from './components/auth/validate/validate.component';
import { contactRecord } from './+state/app/app.selectors';
import { EmulateUserEffects } from './+state/app/effects/emulate-user.effects';
import { IdleEffects } from './+state/app/effects/idle.effects';
import { IdleTimeoutPopupComponent } from './components/idle-timeout-popup/idle-timeout-popup.component';
import { RedirectorObjectData } from 'libs/data-models/lib-data-models/src/lib/models/redirector-links.interface';
import { CremPopupComponent } from '@mango/ui-shared/lib-ui-elements';
import {
  NgIdleKeepaliveModule,
  provideNgIdleKeepalive,
} from '@ng-idle/keepalive';
import { CurrentProjectIdMonitorService } from './services/current-project-monitor.service';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';

const DEV_MODULES = [];

// Wtih StoreDevToolsModule the flag `logOnly` could be used to disable it in stage and higher environments, but for some reason it's not working so this is a work around
if (!environment.production) {
  DEV_MODULES.push(
    StoreDevtoolsModule.instrument({
      name: 'MangoSPA',
      maxAge: 25,
      autoPause: true,
    })
  );
}

@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    ValidateComponent,
    IdleTimeoutPopupComponent,
    ErrorNotificationComponent,
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
      NavigationEffect,
      GlobalSessionEffects,
      EmulateUserEffects,
      IdleEffects,
    ]),
    ...DEV_MODULES,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    CremModule,
    CremPopupComponent,
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
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    { provide: Environment, useValue: environment },
    { provide: IS_CA_STANDALONE_APP, useValue: false },
    { provide: RUNNING_IN_MANGO_SPA, useValue: true },
    AppService,
    BookmarksService,
    AuthService,
    UserService,
    NotificationService,
    StorageService,
    ProjectsDashboardLeftNavService,
    CentralAuthErrorHandler,
    MangoAppFacade,
    HeaderService,
    MangoNavigationService,
    CurrentProjectIdMonitorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private router: Router,
    private facade: MangoAppFacade,
    private mangoNavitationService: MangoNavigationService,
    private projectIdMonitor: CurrentProjectIdMonitorService
  ) {
    this.router.events
      .pipe(
        filter(
          (e: RouterEvent | any) =>
            e instanceof NavigationStart && e.url.includes('.asp')
        ),
        switchMap((e) =>
          combineLatest([
            of(e.url),
            this.facade.clientKey$,
            this.facade.contactRecord$,
            this.facade.redirectorLinks$,
          ])
        ),
        filter(([url, clientKey]) => !!url && !!clientKey && !!contactRecord),
        map(([url, clientKey, contactRecord, redirectorLinks]) => {
          if (
            redirectorLinks &&
            (url.includes('RenderForm') || url.includes('View.asp'))
          ) {
            const objectData: RedirectorObjectData =
              this.getObjectDataFromUrl(url);

            let found = redirectorLinks.find(
              (x) =>
                x.objectTypeId === objectData.objectTypeId &&
                x.objectTypeTypeId === objectData.objectTypeTypeId
            );
            //urlLink = found ? found.urlLink : 'not found';
            let urlLink: any = found ? found.basePageUrl : 'not found';
            const redirectorLink = urlLink;
            const forceRelogin = CREM_FORCE_RELOGIN_URLS.some((subUrl) =>
              redirectorLink.includes(subUrl)
            );

            let v06Url = environment.cremBaseUrl.replace('[CLIENT]', clientKey);
            let v06RedirectorUrl = '';

            if (redirectorLink.includes('?')) {
              v06RedirectorUrl = `${redirectorLink}&OID=${objectData.objectId}&OTID=${objectData.objectTypeId}&OTTID=${objectData.objectTypeTypeId}`;
            } else {
              v06RedirectorUrl = `${redirectorLink}?OID=${objectData.objectId}&OTID=${objectData.objectTypeId}&OTTID=${objectData.objectTypeTypeId}`;
            }

            //If both are true the url is not correct for the gantt chart
            if (
              v06RedirectorUrl.includes(
                'WebReportWithNav.aspx/project-gantt-chart'
              ) &&
              !v06RedirectorUrl.includes(
                'WebReportWithNav.aspx/project-gantt-chart/'
              )
            ) {
              v06RedirectorUrl = v06RedirectorUrl.replace(
                'WebReportWithNav.aspx/project-gantt-chart',
                `WebReportWithNav.aspx/project-gantt-chart/${objectData.objectId}`
              );
            }

            const newUrl = forceRelogin
              ? `${
                  environment.CAUrl
                }?${OAUTH_REDIRECT_QUERY_PARAM}=${v06Url}/v06/login.aspx?ReturnUrl=${encodeURIComponent(
                  v06RedirectorUrl
                )}`
              : `${v06Url}${v06RedirectorUrl}`;

            if (newUrl.includes('.asp')) {
              this.mangoNavitationService.navigateToUrl(newUrl);
            } else {
              window.location.href = newUrl;
            }
          } else {
            const forceRelogin = CREM_FORCE_RELOGIN_URLS.some((subUrl) =>
              url.includes(subUrl)
            );
            let v06Url = environment.cremBaseUrl.replace('[CLIENT]', clientKey);
            const newUrl = forceRelogin
              ? `${
                  environment.CAUrl
                }?${OAUTH_REDIRECT_QUERY_PARAM}=${v06Url}/v06/login.aspx?ReturnUrl=${encodeURIComponent(
                  url
                )}`
              : `${v06Url}${url}`;

            window.location.href = newUrl;
          }
        })
      )
      .subscribe();
  }

  getObjectDataFromUrl(url: string): RedirectorObjectData {
    let objectData: RedirectorObjectData = {
      objectId: 0,
      objectTypeId: 0,
      objectTypeTypeId: 0,
    };
    let splitUrl = url.split('?');
    if (splitUrl.length > 0) {
      const params = splitUrl[1].split('&');
      params.forEach((param) => {
        const [key, value] = param.split('=');
        if (key.toUpperCase() == 'OID') {
          objectData.objectId = +value;
        }
        if (key.toUpperCase() == 'OTID') {
          objectData.objectTypeId = +value;
        }
        if (key.toUpperCase() == 'OTTID') {
          objectData.objectTypeTypeId = +value;
        }
      });
    }
    return objectData;
  }
}
