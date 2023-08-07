import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibCoreSharedModule, NotificationService, StorageService, UserService } from '@mango/core-shared';
import { Environment, IS_CA_STANDALONE_APP } from '@mango/data-models/lib-data-models';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { BookmarksService } from 'apps/mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment.dev';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { IndexModule } from './components/index/index.module';
import * as fromApp from './+state/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CentralAuthFacade } from './+state/facades';
import { CentralAuthEffects } from './+state/effects';
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
    BookmarksService,
    UserService,
    NotificationService,
    StorageService,
    CentralAuthFacade
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
