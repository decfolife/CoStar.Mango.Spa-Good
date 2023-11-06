import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DBkeys, HeaderService, SettingsService, StorageService, UserInfoService } from '@mango/core-shared/lib-core-shared';
import { OAUTH_REDIRECT_QUERY_PARAM, SOURCE_APP_QUERY_PARAM, SUB_LEFT_NEV_PAGES_URLS } from '@mango/data-models/lib-data-models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { of } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';


@Injectable()

export class InitSetupEffects {

  constructor(
    private actions$: Actions,
    private headerService: HeaderService,
    private storageService: StorageService,
    private settingsService: SettingsService,
    private userInfoService: UserInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private facade: MangoAppFacade
  ) { }

  initSetup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.APP_INIT),
        delay(1000),
        switchMap(_ => this.activatedRoute.queryParams),
        map(params => [params.auth_code, params[OAUTH_REDIRECT_QUERY_PARAM], params[SOURCE_APP_QUERY_PARAM]]),
        switchMap(([authCode, redirectionUri, sourceApp]) => {
          const actionsToDispatch: any[] = this.router.url.includes('auth/validate') ? [
            AppActions.setupCremAuthentication({ authCode, redirectionUri })] : [AppActions.setupAuthentication()]

          actionsToDispatch.push(
            AppActions.setupClientKey(),
            AppActions.setupContactRecord(),
            AppActions.setupUserInfo(),
            AppActions.setupHeader()
          )

          // Disable loading session 
          // sourceApp === 'v06' ? actionsToDispatch.push(AppActions.getGlobalSession()) : null
          return of(...actionsToDispatch)
        })
      )
  )

  setupHeader$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_HEADER),
        switchMap(_ => this.headerService.logout$),
        filter(logout => logout === true),
        map(_ => AppActions.logout())
      )
  )

  setupClientKey$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CLIENT_KEY),
        map(_ => this.storageService.getData(DBkeys.CLIENT_KEY)),
        map(clientKey =>
          AppActions.setClientKey({ clientKey })
        )
      )
  )

  setupContactRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CONTACT_RECORD),
        map(_ => this.storageService.getData(DBkeys.CONTACT_RECORD)),
        map(contactRecord =>
          AppActions.setContactRecord({ contactRecord })
        )
      )
  )

  setupUserInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_USER_INFO),
        switchMap(_ => this.userInfoService.getUserLoginInfo()),
        filter(userInfo => userInfo && userInfo.success),
        switchMap(userInfo =>
          of(AppActions.setUserInfo({ userInfo: userInfo.data }), AppActions.setClientInfo({ clientInfo: userInfo.data.client }))
        )
      )
  )

  contactRecordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SET_CONTACT_RECORD),
        switchMap(_ => this.facade.contactRecord$),
        filter(contactRecord => !!contactRecord),
        tap(contactRecord => this.headerService.contactRecord$.next(contactRecord))
      ),
    { dispatch: false }
  );

  getModuleIdValue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        switchMap((r: RouterNavigatedAction) => SUB_LEFT_NEV_PAGES_URLS.some(pageUrl => r.payload.routerState.url.includes(pageUrl)) ? of(
          AppActions.setCurrentRenderFormDocumentParams({ params: r.payload.routerState.url }),
          AppActions.setShowSubLetNav({ show: true })
        ) : of(
          AppActions.setShowSubLetNav({ show: false }),
          AppActions.setModuleId({ moduleId: r.payload.routerState.root.data.moduleId })
        )
        ))
  );
}
