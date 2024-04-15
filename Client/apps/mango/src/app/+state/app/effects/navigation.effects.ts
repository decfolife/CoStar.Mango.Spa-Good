import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AppActions from '../app.actions';
import { map, switchMap, tap } from "rxjs/operators";
import { SharedLeftNavLink } from "libs/data-models/lib-data-models/src/lib/models/link";
import { MangoAppFacade } from "../app.facade";
import { combineLatest, of } from "rxjs";
import { MangoNavigationService } from "@mangoSpa/src/app/services/navigation.service";

@Injectable()

export class NavigationEffect {

  constructor(private actions$: Actions, private facade: MangoAppFacade, private mangoNavigationService: MangoNavigationService) { }

  navigateLeftNavMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.NAVIGATE_LEFT_NAV_MENU),
        switchMap(action => combineLatest([of(action), this.facade.clientKey$])),
        map(([{ navLink }, clientKey]: [{ navLink: SharedLeftNavLink }, string]) =>
          this.mangoNavigationService.handleSpaNavigation(navLink, clientKey)
        )
      ), { dispatch: false }
  )

  navigateHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.NAVIGATE_HOME),
        map(_ => this.mangoNavigationService.navigateHome()),
        switchMap(_ => of(AppActions.setLoading({ display: false })))
      ),
  )

  goToExternalURL = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GO_TO_EXTERNAL_URL),
        map((action: { url: string }) => action.url),
        tap(url => window.location.href = url)
      ), { dispatch: false }
  )
}