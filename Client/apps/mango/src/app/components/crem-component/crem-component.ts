import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HeaderService } from '@mango/core-shared';
import {
  BookmarkGroup,
  BreadCrumb,
  MangoSubApps,
  RenderFormHeaderData,
  ToolbarModuleLink,
} from '@mango/data-models/lib-data-models';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { searchResultsComponent } from '@quick-search/components/modal/search-results/search-results.component';
import { environment } from 'apps/mango/src/environments/environment.local';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link.interface';
import { BookmarksComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/bookmarks/bookmarks.component';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { delay, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { BookmarksService } from '../../../../../mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { GlobalSessionService } from '../../services/global-session.service';
import { Renderer2 } from '@angular/core';
import {
  selectNavigationLinks,
  selectActiveLink,
  selectNavLinksFetched,
} from '../../+state/app/app.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mango-crem-component',
  templateUrl: './crem-component.html',
  styleUrls: ['./crem-component.scss'],
  // entryComponents: [RenderFormHeaderComponent] // @deprecated in Angular@16 https://stackoverflow.com/questions/77057726/entrycomponents-substitution-in-angular-16
})
export class CremComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('cremBookmark', { static: false })
  cremBookmarkComponent: BookmarksComponent;
  @ViewChild('appModule') appModule: ElementRef<HTMLDivElement>;

  navigationLinks: any = [];
  public navLinksFetched = false;
  toolbarModuleLinks: ToolbarModuleLink[];
  chipContent$: Observable<string> = this.facade.clientKey$.pipe(
    map((clientKey) => `${clientKey} - ${environment.name}`)
  );
  userAppType$: Observable<number> = this.facade.contactRecord$.pipe(
    filter((contact) => !!contact),
    switchMap((contact) => of(contact.userAppType))
  );
  popoverContent: string;
  activeLink: string = null;
  crumbActiveLink: string = null;
  private subs: Subscription = new Subscription();
  public searchResultsDialogRef: MatDialogRef<any> | null = null;

  public headerDefaultHeight: number;
  public showRenderFormPropertyHeader: boolean;
  public renderFormHeaderData: RenderFormHeaderData;

  bookmarkGroups: BookmarkGroup[] = null;
  public delineator = '»';
  navigationLinks$: Observable<any[]> = this.store.select(
    selectNavigationLinks
  );
  activeLink$: Observable<string | null> = this.store.select(selectActiveLink);
  navLinksFetched$: Observable<boolean> = this.store.select(
    selectNavLinksFetched
  );

  constructor(
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private leftNavService: ProjectsDashboardLeftNavService,
    private headerService: HeaderService,
    private bookmarksService: BookmarksService,
    public dialog: MatDialog,
    public facade: MangoAppFacade,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getToolbarModuleLinks();
    this.getDatabaseRestoreInfo();
    this.facade.refreshLeftSideNav();
    this.buildBreadCrumbs();
  }

  ngAfterViewInit(): void {
    window.addEventListener(
      'ToogleBookmarkDrawer',
      this.openCloseBookmarkDrawer.bind(this)
    );

    window.addEventListener(
      'RenderFormShowPropertyHeader',
      this.showRenderFormHeader.bind(this)
    );

    window.addEventListener(
      'SetCustomLeftNavItems',
      this.setCustomLeftNavItems.bind(this)
    );

    this.updateHeight();
  }

  private getToolbarModuleLinks() {
    this.subs.add(
      this.headerService.getUserModules().subscribe({
        next: (res: any) => (this.toolbarModuleLinks = res.data),
      })
    );
  }

  private setCustomLeftNavItems(event: CustomEvent) {
    setTimeout(() => {
      this.navigationLinks = event.detail;
    });
  }

  private getDatabaseRestoreInfo() {
    this.subs.add(
      this.headerService.getDBLastRestore().subscribe({
        next: (res: any) => (this.popoverContent = res.data),
      })
    );
  }

  private openCloseBookmarkDrawer() {
    if (
      !this.cremBookmarkComponent.recentDrawer.opened &&
      this.bookmarkGroups === null
    ) {
      this.subs.add(
        this.bookmarksService.createBookmarkList().subscribe((res) => {
          this.bookmarkGroups = res;
        })
      );
    }

    this.cremBookmarkComponent.toggleBookmarkDrawer();
  }

  quickSearch(event: any) {
    if (this.searchResultsDialogRef) {
      this.searchResultsDialogRef.close();
      this.searchResultsDialogRef.afterClosed().subscribe(() => {
        this.openSearchModal(event);
      });
    } else {
      this.openSearchModal(event);
    }
  }

  openSearchModal(event: any) {
    this.searchResultsDialogRef = this.dialog.open(searchResultsComponent, {
      hasBackdrop: false,
      width: '100%',
      height: 'calc(100% - 100px)',
      maxWidth: '90vw',
      panelClass: 'mqs-search-results',
      data: {
        searchString: event.searchStr,
        searchObjectId: event.searchObjId,
      },
      disableClose: true,
    });

    this.searchResultsDialogRef.afterClosed().subscribe(() => {
      this.searchResultsDialogRef = null;
    });
  }

  handleSpaNavigation(navLink: SharedLeftNavLink) {
    this.facade.navigateLeftNevMenu(navLink);
  }

  navigateToBreadcrumb(breadcrumb: BreadCrumb) {
    this.activeLink = breadcrumb.activeLink;
    this.router.navigate([breadcrumb.url], { queryParams: breadcrumb.params });
  }

  getActiveLink(toActiveLink: string) {
    this.activeLink = toActiveLink;
  }

  buildBreadCrumbs() {
    // if the breadcrumbs get updated
    // then update the activeLink accordingly
    this.subs.add(
      this.facade.breadcrumbs$
        .pipe(
          map((breadcrumbs) => {
            if (!breadcrumbs || breadcrumbs.length === 0) {
              return;
            }
            const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];
            this.activeLink = lastBreadcrumb.activeLink;
          })
        )
        .subscribe()
    );

    // populate breadcrumbs for the app
    this.crumbActiveLink = null;
    this.subs.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          startWith(this.router),
          map((e) => {
            let breadcrumbs = [];
            let currentRoute = this.activatedRoute.snapshot;
            let url = '';
            while (currentRoute) {
              const routeBreadcrumbData = currentRoute.data.breadCrumb;
              url +=
                '/' + currentRoute.url.map((segment) => segment.path).join('/');
              if (routeBreadcrumbData && routeBreadcrumbData.label) {
                this.crumbActiveLink =
                  routeBreadcrumbData.activeLink || this.crumbActiveLink;
                const breadCrumb: BreadCrumb = {
                  label: routeBreadcrumbData.label,
                  url: url,
                  params: currentRoute.queryParams,
                  activeLink: routeBreadcrumbData.activeLink
                    ? routeBreadcrumbData.activeLink
                    : this.activeLink,
                };
                if (routeBreadcrumbData.append) {
                  breadcrumbs.push(breadCrumb);
                }
              }
              currentRoute = currentRoute.firstChild;
            }
            this.facade.setBreadcrumbs(breadcrumbs);
            return breadcrumbs;
          }),
          delay(4000),
          switchMap((breadcrumbs) =>
            combineLatest([of(breadcrumbs), this.facade.globalSession$])
          ),
          filter(
            ([breadcrumbs, globalSession]) => !!breadcrumbs && !!globalSession
          ),
          tap(([breadcrumbs, globalSession]) => {
            const v06ParsedBreadcrumbs =
              GlobalSessionService.generateV06Breadcrumbs(breadcrumbs);
            const updatedGlobalSession = {
              ...globalSession,
              breadCrumbs: v06ParsedBreadcrumbs,
            };
            this.facade.updateGlobalSession(updatedGlobalSession);
          })
        )
        .subscribe()
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateHeight();
  }

  private showRenderFormHeader(event: CustomEvent) {
    if (event.detail instanceof RenderFormHeaderData) {
      this.renderFormHeaderData = event.detail;
      this.showRenderFormPropertyHeader = this.renderFormHeaderData.isVisible;
      this.headerDefaultHeight = !this.renderFormHeaderData.isVisible
        ? 115
        : 240;
      this.updateHeight();
    }
  }

  private updateHeight() {
    if (this.appModule) {
      const windowHeight = window.innerHeight;
      const calculatedHeight = windowHeight - this.headerDefaultHeight;
      this.renderer.setStyle(
        this.appModule.nativeElement,
        'height',
        calculatedHeight + 'px'
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
