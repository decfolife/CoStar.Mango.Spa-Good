import { Injectable } from '@angular/core';
import { UserInfoService, UserService } from '@mango/core-shared/lib-core-shared';
import { SUB_LEFT_NEV_PAGES_URLS } from '@mango/data-models/lib-data-models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';


@Injectable()

export class InitSetupEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userInfoService: UserInfoService,
    private facade: MangoAppFacade
  ) { }

  initSetup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.APP_INIT),
        switchMap(_ => of(
          AppActions.setupClientKey(),
          AppActions.setupContactRecord(),
          AppActions.setupUserInfo()
        ))
      )
  )

  setupClientKey$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CLIENT_KEY),
        switchMap(_ => this.facade.authenticatedUser$),
        filter(user => !!user),
        map(user =>
          AppActions.setClientKey({ clientKey: user.clientKey })
        )
      )
  )

  setupContactRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.SETUP_CONTACT_RECORD),
        switchMap(_ => this.facade.authenticatedUser$),
        filter(user => !!user),
        switchMap(user => this.userService.getContactRecord(user.email, user.contactId, user.clientKey)),
        filter(contactRecord => !!contactRecord),
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
