import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as AppActions from '../app.actions';
import { delay, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { DBkeys, HeaderService, SettingsService, StorageService, UserInfoService } from '@mango/core-shared/lib-core-shared';
import { MangoAppFacade } from '../app.facade';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { EMPTY, iif, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OAUTH_REDIRECT_QUERY_PARAM } from '@mango/data-models/lib-data-models';


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
        map(params => [params.auth_code, params[OAUTH_REDIRECT_QUERY_PARAM]]),
        switchMap(([authCode, redirectionUri]) => {
          return this.router.url.includes('auth/validate') ? of(
            AppActions.setupCremAuthentication({ authCode, redirectionUri }),
            AppActions.setupClientKey(),
            AppActions.setupContactRecord(),
            AppActions.setupUserInfo(),
            AppActions.setupHeader()) : of(
              AppActions.setupAuthentication(),
              AppActions.setupClientKey(),
              AppActions.setupContactRecord(),
              AppActions.setupUserInfo(),
              AppActions.setupHeader())
        }
        )
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
        switchMap(_ => this.settingsService.clientKey$),
        map(clientKey =>
          AppActions.setClientKey({ clientKey: clientKey || this.storageService.getData(DBkeys.CLIENT_KEY) })
        )
      )
  )

  setupContactRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CONTACT_RECORD),
        switchMap(_ => this.settingsService.contactRecord$),
        map(contactRecord =>
          AppActions.setContactRecord({ contactRecord: contactRecord || this.storageService.getData(DBkeys.CONTACT_RECORD) })
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
        filter((r: RouterNavigatedAction) => r.payload.routerState.url.toLocaleLowerCase().startsWith('/crem') ||
          r.payload.routerState.url.toLocaleLowerCase().startsWith('/v06')),
        switchMap((r: RouterNavigatedAction) => {
          if (r.payload.routerState.url.toLocaleLowerCase().startsWith('/crem/forms/render-form')) {
            of(this.facade.dispatchRenderFormEvent(r.payload.routerState.url))
          }
          else {
            return this.facade.moduleId$.pipe(
              //combine data into one object
              mergeMap((currentModuleId: number) => {
                return this.facade.renderFormLeftNavDisplayed$.pipe(
                  map((rfLeftNavDisplayed: boolean) => { return { currentModuleId, rfLeftNavDisplayed }; })
                );
              }),
              map((mappedObj: any) => {
                const rootData = r.payload.routerState.root.data;
                const newModuleId = rootData === undefined ||
                  rootData === null ||
                  rootData.moduleId === undefined ? undefined : rootData.moduleId;

                //If the new module id equals the previous value there is no need to update the store by calling the action
                //If the renderform left nav is displayed even if the module id is the same we need to load the left nav
                if (newModuleId !== mappedObj.currentModuleId || mappedObj.rfLeftNavDisplayed) {
                  this.facade.setModuleId(newModuleId);
                }
              }))
          }
        })),
    { dispatch: false }
  );
}
