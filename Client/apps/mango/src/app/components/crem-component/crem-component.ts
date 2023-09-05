import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BookmarkGroup, ToolbarModuleLink, BreadCrumb } from '@mango/data-models/lib-data-models';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'apps/mango/src/environments/environment.local';
import { BookmarksComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/bookmarks/bookmarks.component';
import { Observable, of, Subscription } from 'rxjs';
import { BookmarksService } from '../../../../../mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { searchResultsComponent } from '@quick-search/components/modal/search-results/search-results.component';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { filter, switchMap } from 'rxjs/operators';
import { HeaderService } from '@mango/core-shared';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';

@Component({
  selector: 'mango-crem-component',
  templateUrl: './crem-component.html',
  styleUrls: ['./crem-component.scss'],
})
export class CremComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('cremBookmark', { static: false }) cremBookmarkComponent: BookmarksComponent;
  navigationLinks: any = [];
  public navLinksFetched = false;
  toolbarModuleLinks: ToolbarModuleLink[];
  public moduleId: number;
  chipContent$: Observable<string> = of(null);
  userAppType$: Observable<number> = of(null);
  popoverContent: string[];
  activeLink: string = null;
  private subs: Subscription = new Subscription();

  protected httpOptions: any = {
    // hard coded until we start getting logged in with actual data for the user
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'RETAILDEMO',
    }),
  };

  bookmarkGroups: BookmarkGroup[] = null;

  constructor(
    private router: Router,
    private leftNavService: ProjectsDashboardLeftNavService,
    private headerService: HeaderService,
    private bookmarksService: BookmarksService,
    public dialog: MatDialog,
    public facade: MangoAppFacade
  ) {
    this.popoverContent = ['Backup File Name: E:RetailDemo_BackupsFULL_DEV_VP_RETAILDEMO_V05_20200930_020000.sqb',
      'Database Restore Date: 2020-09-30 11:17:54',
      ' Database Backup Date: 2020-09-30 02:00:50 '];
  }

  ngOnInit(): void {
    this.userAppType$ = this.facade.userInfo$.pipe(
      filter((userInfo) => !!userInfo),
      switchMap(userInfo => {
        return of(userInfo.userAppType);;
      }));

    this.getToolbarModuleLinks();
    this.chipContent$ = this.facade.clientKey$.pipe(switchMap(clientKey => of(`${clientKey} - ${environment.name}`)))
    this.subs.add(this.facade.moduleIdBehaviorSubject$.subscribe(
      (modId: number) => {
        this.moduleId = modId;
        this.getModuleNavLinks(this.moduleId);
      }));

    this.subs.add(this.facade.renderFormBehaviorSubject$.subscribe(
      (routeUrl: string) => {
        this.getModuleNavLinksForRenderForm(routeUrl);
      }));
  }

  getModuleNavLinks(moduleId: number) {
    //Module id is undefined there is no need to load the links
    if (moduleId === undefined) {
      return;
    }

    //For now the null value will be used to clear the links from the leftnav.  This may change in the future.  
    if (moduleId === null) {
      this.navigationLinks = [];
      this.navLinksFetched = true;
      this.activeLink = null;

      return;
    }

    this.subs.add(this.leftNavService.getModuleNavigationLinks(moduleId).subscribe(
      (res: any) => {
        this.navigationLinks = res.data;
        this.navLinksFetched = true;

        if (this.navigationLinks.length > 0) {
          //This will need to change in the future
          if (this.navigationLinks.find(nl => nl.name.toLowerCase() === 'dashboard') !== undefined)
            this.activeLink = 'Dashboard';
          else
            this.activeLink = this.navigationLinks[0].name;
        }
      },
      (error: any) => {
        this.navLinksFetched = false;
      }
    ));
  }

  getModuleNavLinksForRenderForm(routeUrl: string) {
    //Routeurl is null there is no need to get the links
    if (routeUrl == null) {
      return;
    }

    this.subs.add(this.leftNavService.getModuleNavigationLinksForRenderForm(routeUrl).subscribe(
      (res: any) => {
        this.navigationLinks = res.data;
        this.navLinksFetched = true;
        if (this.navigationLinks.length > 0) {
          //This will need to change in the future
          this.activeLink = this.navigationLinks[0].name;
        }
      },
      (error: any) => {
        this.navLinksFetched = false;
      }));
  }

  ngAfterViewInit(): void {
    window.addEventListener(
      'ToogleBookmarkDrawer',
      this.openCloseBookmarkDrawer.bind(this)
    );
  }

  private getToolbarModuleLinks() {
    this.subs.add(this.headerService.getUserModules().subscribe({
      next: (res: any) => this.toolbarModuleLinks = res.data
    }))
  }

  private openCloseBookmarkDrawer() {
    if (
      !this.cremBookmarkComponent.recentDrawer.opened &&
      this.bookmarkGroups === null
    ) {
      this.subs.add(this.bookmarksService.createBookmarkList().subscribe((res) => {
        this.bookmarkGroups = res;
      }));
    }

    this.cremBookmarkComponent.toggleBookmarkDrawer();
  }

  quickSearch(e) {
    this.dialog.open(searchResultsComponent, {
      width: '100%',
      height: 'calc(100% - 100px)',
      maxWidth: '90vw',
      panelClass: 'mqs-search-results',
      data: {
        searchString: e.searchStr, searchObjectId: e.searchObjId
      },
      disableClose: true
    });
  }

  handleSpaNavigation(navLink: SharedLeftNavLink) {
    this.facade.navigateLeftNevMenu(navLink)
  }

  navigateToBreadcrumb(breadcrumb: BreadCrumb) {
    this.router.navigate([breadcrumb.url], { queryParams: breadcrumb.params });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
