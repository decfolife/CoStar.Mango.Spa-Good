import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LibCoreSharedModule, NotificationService, StorageService, UserService } from '@mango/core-shared';
import { Environment, IDLE_TIMOUT_DELAY_SECONDS, IS_CA_STANDALONE_APP } from '@mango/data-models/lib-data-models';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookmarksService } from 'apps/mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { provideUserIdleConfig } from 'libs/core-shared/src/lib/services';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment.dev';
import { CentralAuthEffects } from './+state/effects';
import { CentralAuthFacade } from './+state/facades';
import * as fromApp from './+state/reducers';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { IndexModule } from './components/index/index.module';
import { AuthorizeComponent } from './components/oauth/authorize/authorize.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    IndexModule,
    LibCoreSharedModule,
    LibUiSharedModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'oauth',
        children: [
          {
            path: 'authorize',
            component: AuthorizeComponent
          }
        ]
      },
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
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
    StoreModule.forFeature(fromApp.CENTRAL_AUTH_FEATURE_KEY, fromApp.reducer),
    EffectsModule.forFeature([CentralAuthEffects]),
    StoreDevtoolsModule.instrument(),
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-bottom-center',
      progressBar: true,
      closeButton: true,
      tapToDismiss: false,
      disableTimeOut: true,
    }),
  ],
  providers: [
    { provide: Environment, useValue: environment },
    { provide: IS_CA_STANDALONE_APP, useValue: true },
    provideUserIdleConfig({ idle: 1, timeout: IDLE_TIMOUT_DELAY_SECONDS, ping: 2 }),
    BookmarksService,
    UserService,
    NotificationService,
    StorageService,
    CentralAuthFacade
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
