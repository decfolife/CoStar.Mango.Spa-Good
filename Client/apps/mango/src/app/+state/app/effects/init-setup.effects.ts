import { Injectable } from '@angular/core';
import { UserInfoService, UserService } from '@mango/core-shared/lib-core-shared';
import { SUB_LEFT_NEV_PAGES_URLS } from '@mango/data-models/lib-data-models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as AppActions from '../app.actions';
import { MangoAppFacade } from '../app.facade';
import { ActivatedRoute } from '@angular/router';
import { MangoNavigationService } from '@mangoSpa/src/app/services/navigation.service';


@Injectable()
export class InitSetupEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private userInfoService: UserInfoService,
    private navigationService: MangoNavigationService, 
    private facade: MangoAppFacade,
    private acitvatedRoute: ActivatedRoute
  ) { }

  initSetup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.APP_INIT),
        switchMap(_ => this.acitvatedRoute.queryParamMap),
        map(queryParamsMap => [queryParamsMap.get('logout')]),
        tap(([logout]) => {
          // When logging out of V06, V06 will redirect to SPA with a query param to logout
          if (logout === 'true') {
            this.facade.logout()
          }
        }),
        switchMap(_ => of(
          AppActions.setupClientKey(),
          AppActions.setupContactRecord(),
          AppActions.redirectToV06ToFinalizeLogin()
        ))
  ))

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
        switchMap(_ => combineLatest([this.facade.authenticatedUser$, this.facade.contactRecord$])),
        filter(([user, contact]) => !!user && !contact),
        switchMap(([user, contact]) => this.userService.getContactRecord(user.email, user.contactId, user.clientKey)),
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

  // To complete login, need to login to V06 as well.
  redirectToV06ToFinalizeLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.REDIRECT_TO_V06_TO_FINALIZE_LOGIN),
        switchMap(_ => this.facade.v06Auth$),      
        filter(v06Auth => !!v06Auth),  
        tap(v06Auth => {
          this.navigationService.redirectToV06Login(v06Auth.authCode)
        })
      ),
      { dispatch: false }
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