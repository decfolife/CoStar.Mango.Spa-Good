import { Injectable } from "@angular/core"
import { UserInfoService } from "@mango/core-shared"
import { GlobalSessionService } from "@mangoSpa/src/app/services/global-session.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { filter, map, switchMap } from "rxjs/operators"
import * as AppActions from '../app.actions'
import { MangoAppFacade } from "../app.facade"

@Injectable()

export class GlobalSessionEffects {
  constructor(
    private actions$: Actions,
    private userInfoService: UserInfoService,
    private facade: MangoAppFacade
  ) { }
  setupSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GET_GLOBAL_SESSION),
        switchMap(_ => this.userInfoService.getGlobalSession()),
        switchMap(session =>
          of(
            AppActions.getGlobalSessionSuccess({ session }),
            AppActions.populateBreadcrumbsFromSession()
          )
        )
      )
  )

  updateGlobalSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.UPDATE_GLOBAL_SESSION),
        switchMap(action => this.userInfoService.updateGlobalSession((action as any).session)),
        switchMap(_ => of(AppActions.updateGlobalSessionSuccess())),
      )
  )

  populateBreadcrumbsFromSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.POPULATE_BREADCRUMBS_FROM_SESSION),
        switchMap(_ => this.facade.globalSession$),
        filter(globalSession => !!globalSession),
        map(globalSession => {
          const parsedBreadcrumbs = GlobalSessionService.generateMangoBreadcrumbs(globalSession.breadCrumbs)

          /* Ignore using the sesssion breadcrumbs for now */
          // this.facade.setBreadcrumbs(parsedBreadcrumbs)
        }),
      ), { dispatch: false }
  )
}