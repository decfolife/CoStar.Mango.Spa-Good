import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from '../app.actions';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link.interface';
import { MangoAppFacade } from '../app.facade';
import { combineLatest, of } from 'rxjs';
import { MangoNavigationService } from '@mangoSpa/src/app/services/navigation.service';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { MangoSubApps } from '@mango/data-models/lib-data-models';
import { RedirectorMapping } from 'libs/data-models/lib-data-models/src/lib/models/redirector-links.interface';

@Injectable()
export class NavigationEffect {
  constructor(
    private actions$: Actions,
    private facade: MangoAppFacade,
    private mangoNavigationService: MangoNavigationService,
    private leftNavService: ProjectsDashboardLeftNavService
  ) {}

  loadLeftNavLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadLeftNavLinks),
      switchMap((_) => {
        return combineLatest([
          this.facade.authenticatedUser$,
          this.facade.showSubLeftNav$,
          this.facade.moduleId$,
          this.facade.currentRenderFormDocumentParams$,
          this.facade.currentSubApp$,
          this.facade.redirectorMappings$,
        ]);
      }),
      filter(([user]) => !!user),
      switchMap(
        ([
          _,
          showSubLeftNav,
          moduleId,
          url,
          currentSubApp,
          redirectorMappings,
        ]) => {
          let serviceCall$;

          if (!showSubLeftNav && !!!moduleId) {
            serviceCall$ = of(null);
          } else if (showSubLeftNav) {
            serviceCall$ =
              this.leftNavService.getModuleNavigationLinksForRenderForm(
                url,
                redirectorMappings
              );
          } else if (moduleId === 6 && currentSubApp !== MangoSubApps.ADMIN) {
            serviceCall$ =
              currentSubApp === MangoSubApps.ETL
                ? this.leftNavService.getModuleNavigationLinks(moduleId)
                : this.leftNavService.getAdminModulesNavigationLinks(moduleId);
          } else {
            serviceCall$ =
              this.leftNavService.getModuleNavigationLinks(moduleId);
          }

          return serviceCall$.pipe(
            map((response) => ({
              response,
              moduleId,
              currentSubApp,
              url,
            }))
          );
        }
      ),
      map(({ response, moduleId, currentSubApp, url }) => {
        const navLinksFetched =
          !(moduleId === 6 && currentSubApp === MangoSubApps.ADMIN) &&
          response !== null;
        const navigationLinks = this.addAiLeasesNavLink(
          !!response ? response.data : [],
          moduleId,
          url
        );
        const activeLink = navigationLinks[0]?.name || null;

        return AppActions.loadLeftNavLinksSuccess({
          navigationLinks,
          activeLink,
          navLinksFetched,
        });
      })
    )
  );

  // temporary method to add AI Leases link under Leases in 
  // the left nav until it's available from the backend. 
  // This is needed to support navigation to AI Leases page 
  // from CREM while the feature is being developed and not yet released.
  private addAiLeasesNavLink(
    navigationLinks: SharedLeftNavLink[],
    moduleId: number,
    currentUrl?: string | null
  ): SharedLeftNavLink[] {
    if (moduleId !== 1 || !Array.isArray(navigationLinks)) {
      return navigationLinks;
    }

    const leasesIndex = navigationLinks.findIndex(
      (link) => link.name === 'Leases' || link.dynamicName === 'Leases'
    );

    if (leasesIndex < 0) {
      return navigationLinks;
    }

    if (
      navigationLinks.some(
        (link) => link.name === 'AI Leases' || link.dynamicName === 'AI Leases'
      )
    ) {
      return navigationLinks;
    }

    const leasesLink = navigationLinks[leasesIndex];
    const isAiLeasesActive =
      !!currentUrl &&
      currentUrl.toLowerCase().includes('/crem/portfolio/ai-abstractions');
    const aiLeasesLink: SharedLeftNavLink = {
      ...leasesLink,
      id: undefined,
      name: 'AI Leases',
      dynamicName: 'AI Leases',
      categoryHasFlyOutMenu: false,
      categoryIsCurrentlyActiveLink: isAiLeasesActive,
      categoryLinkUrl: leasesLink.categoryLinkUrl,
      categorySpaUrl: leasesLink.categorySpaUrl,
      categorySpaQueryParameters: leasesLink.categorySpaQueryParameters,
      sortOrder: leasesLink.sortOrder + 1,
      linkUrl: '/crem/portfolio/ai-abstractions',
      usesNgRouting: true,
      spaUrl: '/crem/portfolio/ai-abstractions',
      spaQueryParameters: undefined,
      isCurrentlyActiveLink: isAiLeasesActive,
      subChildLevel: leasesLink.subChildLevel,
      subChildLevelNavLinks: leasesLink.subChildLevelNavLinks,
    };

    return [
      ...navigationLinks.slice(0, leasesIndex + 1),
      aiLeasesLink,
      ...navigationLinks.slice(leasesIndex + 1),
    ];
  }

  navigateLeftNavMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.NAVIGATE_LEFT_NAV_MENU),
        switchMap((action) =>
          combineLatest([
            of(action),
            this.facade.clientKey$,
            this.facade.redirectorMappings$,
          ])
        ),
        map(
          ([{ navLink }, clientKey, redirectorMappings]: [
            { navLink: SharedLeftNavLink },
            string,
            RedirectorMapping[]
          ]) =>
            this.mangoNavigationService.handleLeftNavNavigation(
              navLink,
              clientKey,
              redirectorMappings
            )
        )
      ),
    { dispatch: false }
  );

  navigateHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.NAVIGATE_HOME),
      map((_) => this.mangoNavigationService.navigateHome()),
      switchMap((_) => of(AppActions.setLoading({ display: false })))
    )
  );

  goToExternalURL = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.GO_TO_EXTERNAL_URL),
        map((action: { url: string }) => action.url),
        tap((url) => (window.location.href = url))
      ),
    { dispatch: false }
  );
}
