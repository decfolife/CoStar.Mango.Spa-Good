import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterEvent,
  NavigationCancel,
  NavigationError,
  NavigationStart,
} from '@angular/router';
import { MangoSubApps } from '@mango/data-models/lib-data-models';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { MangoAppFacade } from './+state/app/app.facade';
import { CremComponent } from './components/crem-component';
import { AuthGuard } from './services/guards/auth.guard';
import { AppService } from './app.service';
import { AppComponent } from './app.component';

const routes: Routes = [
  // LOGIN
  {
    path: 'auth/validate',
    component: AppComponent
  },

  // START PAGE
  {
    path: 'start-page',
    loadChildren: () =>
      import(
        '@start-page/components/index/index.module'
      ).then((mod) => mod.IndexModule),
    data: { currentSubApp: MangoSubApps.START_PAGE, moduleId: null, breadCrumb: { label: 'Start Page', append: false } },
  },

  // MAIN APP
  {
    path: 'crem',
    component: CremComponent,
    canActivate: [AuthGuard],
    data: { breadCrumb: { label: null, append: false } },
    children: [
      // Redirect to initial App after logging in
      { path: '', redirectTo: 'projects/dashboard', pathMatch: 'full' },

      // PROJECTS/DEALS PATH
      {
        path: 'projects',
        data: { moduleId: 2, breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            loadChildren: () =>
              import(
                '@project-dashboard/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.PROJECTS_DASHBOARD, moduleId: 2, breadCrumb: { label: 'Projects Dashboard', append: false, activeLink: 'Dashboard' } },
          },
          // Deals route
          // Tasks route
          {
            path: 'tasks',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 2,
              objectTypeId: 9,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Tasks', append: true }
            },
          },
          //Projects list page
          {
            path: 'projects',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 2,
              objectTypeId: 1,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Projects', append: true }
            },
          },
          {
            path: 'recent-activities',
            loadChildren: () =>
              import(
                '@project-dashboard/components/recent-activities/recent-activities.module'
              ).then((mod) => mod.RecentActivitiesModule),
            data: {
              moduleId: 2,
              objectTypeId: null,
              breadCrumb: { label: 'Recent Activities', append: true }
            },
          },
        ]
      },

      // STRATEGY
      {
        path: 'strategy',
        data: { breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard', // Todo: Temporary component pointing to 404
            loadChildren: () =>
              import(
                '@mangoSpa/src/app/components/not-found-page/not-found-page-routing.module'
              ).then((mod) => mod.NotFoundPageRoutingModule),
            data: {
              moduleId: null,
              currentSubApp: null,
              breadCrumb: { label: 'Strategy Dashboard', append: false, activeLink: 'Dashboard' }
            },
          },
        ]
      },

      // PORTFOLIO
      {
        path: 'portfolio',
        data: { moduleId: 1, breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            loadChildren: () =>
              import(
                '@portfolio-dashboard/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 1,
              currentSubApp: MangoSubApps.PORTFOLIO_DASHBOARD,
              breadCrumb: { label: 'Portfolio Dashboard', append: false, activeLink: 'Dashboard' }
            },
          },
          {
            path: 'buildings',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 1,
              objectTypeId: 5,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Buildings', append: true }
            },
          },
          {
            path: 'leases',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 1,
              objectTypeId: 4,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Leases', append: true }
            },
          },
        ]
      },

      // ACCOUNTING PATH
      {
        path: 'accounting',
        data: { moduleId: 9, breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          // Dashboard & Accounting Events
          {
            path: 'dashboard', loadChildren: () =>
              import(
                '@accounting-dashboard/components/index/index.module'
              ).then((mod) => mod.IndexMainModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.ACCOUNT_MANAGEMENT,
              breadCrumb: { label: 'Accounting Dashboard', append: false, activeLink: 'Dashboard' }
            }
          },
          //accounting events
          {
            path: 'events',
            loadChildren: () =>
              import(
                '@accounting-dashboard/components/listpage/accounting-listpage/accounting-listpage.module'
              ).then((mod) => mod.AccountingListpageModule),
            data: {
              moduleId: 9,
              objectTypeId: null,
              breadCrumb: { label: 'Events', append: true }
            },
          },
          // Alerts
          {
            path: 'lease-alerts',
            loadChildren: () =>
              import(
                '@lease-alerts/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              breadCrumb: { label: 'Lease Alerts', append: true }
            },
          },
          {
            path: 'alerts-rules',
            loadChildren: () =>
              import(
                '@alerts-rules/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.ALERT_RULES,
              breadCrumb: { label: 'Alerts Rules', append: true }
            },
          },
          // Batch Processes
          {
            path: 'batch-accounting',
            loadChildren: () =>
              import(
                '@batch-accounting/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.BATCH_ACCOUNTING,
              breadCrumb: { label: 'Batch Accounting', append: true }
            },
          },
          {
            path: 'summary',
            loadChildren: () =>
              import(
                '@accounting-summary/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.BATCH_ACCOUNTING,
              breadCrumb: { label: 'Accounting Summary', append: false }
            },
          },
          // Accounting Settings
          {
            path: 'settings',
            loadChildren: () =>
              import(
                '@accounting-accountmanagement/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.LEASE_ALERTS,
              breadCrumb: { label: 'Accounting Settings', append: true }
            },
          },
          { // Discount Rate Profile | Amortization Rate Profile | Journal Entries Profile, etc
            path: 'discountrateprofiles',
            loadChildren: () =>
              import(
                '@accounting-profile/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.ACCOUNTING_PROFILE,
              breadCrumb: { label: 'Discount Rate Profiles', append: true }
            },
          },
        ]
      },

      // CONTACTS
      {
        path: 'contacts',
        data: { moduleId: 3, breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'companies/list', pathMatch: 'full' },
          {
            path: 'companies/list',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 3,
              objectTypeId: 11,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Companies', append: false, activeLink: 'Companies' }
            },
          },
          {
            path: 'contacts/list',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 3,
              objectTypeId: 5,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Contacts', append: true }
            },
          },
        ]
      },

      // REPORTS
      {
        path: 'reports',
        data: { moduleId: 4, breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadChildren: () =>
              import(
                '@reports/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.REPORTS, moduleId: 4, breadCrumb: { label: 'Reports', append: false, activeLink: 'Reports' } },
          },
        ]
      },

      // ADMIN
      {
        path: 'admin',
        data: { breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadChildren: () =>
              import(
                '@user-maintenance/components/admin-landing-page/admin.module'
              ).then((mod) => mod.AdminModule),
            data: {
              moduleId: 6,
              currentSubApp: MangoSubApps.USER_MAINTENANCE,
              breadCrumb: { label: 'Admin', append: false, activeLink: 'Dashboard' }
            },
          },
          // TODO: Fix path to prevent duplicated path, E.g. /crem/admin/user-maintenance/user-maintenance
          // User Maintenance
          {
            path: 'user-maintenance',
            loadChildren: () =>
              import(
                '@user-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.USER_MAINTENANCE, moduleId: null, breadCrumb: { label: 'User Maintenance', append: true } },
          },
          // Service Accounts
          {
            path: 'service-accounts',
            loadChildren: () =>
              import(
                '@service-accounts/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.SERVICE_ACCOUNTS, moduleId: null, breadCrumb: { label: 'Service Accounts', append: false } },
          },
          // Service Accounts
          {
            path: 'service-accounts',
            loadChildren: () =>
              import(
                '@service-accounts/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.SERVICE_ACCOUNTS, moduleId: null, breadCrumb: { label: 'Service Accounts', append: false } },
          },
          // Service Accounts
          {
            path: 'service-accounts',
            loadChildren: () =>
              import(
                '@service-accounts/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.SERVICE_ACCOUNTS, moduleId: null, breadCrumb: { label: 'Service Accounts', append: false } },
          },
          // Group Maintenance
          {
            path: 'group-maintenance',
            loadChildren: () =>
              import(
                '@group-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: { currentSubApp: MangoSubApps.GROUP_MAINTENANCE, moduleId: null, breadCrumb: { label: 'Group Maintenance', append: true } },
          },
          // Object Maintenance
          {
            path: 'object-maintenance',
            loadChildren: () =>
              import(
                '@object-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.OBJECT_MAINTENANCE,
              moduleId: null,
              breadCrumb: { label: 'Object Maintenance', append: true }
            },
          },
          // Portfolio Maintenance
          {
            path: 'portfolio-maintenance',
            loadChildren: () =>
              import(
                '@portfolio-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.PORTFOLIO_MAINTENANCE,
              moduleId: null,
              breadCrumb: { label: 'Portfolio Maintenance', append: true }
            },
          },
        ]
      },

      // Auto-generated components below
      // @!micro-component-generator: don't delete this line
    ]
  },

  // Edit & render forms
  {
    path: 'forms',
    loadChildren: () =>
      import(
        '@forms/mango-forms/mango-forms.module'
      ).then((mod) => mod.MangoFormsModule),
    data: { moduleId: null, breadCrumb: { label: null, append: true } },
  },

  // Redirect to Login
  { path: '', redirectTo: 'crem', pathMatch: 'full' },

  // 404
  {
    path: '**',
    component: CremComponent,
    loadChildren: () =>
      import(
        '@mangoSpa/src/app/components/not-found-page/not-found-page-routing.module'
      ).then((mod) => mod.NotFoundPageRoutingModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

  subs: Subscription = new Subscription()
  constructor(
    private facade: MangoAppFacade,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) {
    this.subs.add(this.router.events.subscribe(this.navigationInterceptor.bind(this)))
    this.subs.add(this.getCurrentSubApp().subscribe((currentSubApp) =>
      this.facade.loadSubApp(currentSubApp)
    ))
  }

  getCurrentSubApp(): Observable<MangoSubApps> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute.snapshot),
      switchMap((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return of(route.data['currentSubApp']);
      })
    );
  }

  // Loading Indicator using the router
  private navigationInterceptor(e: RouterEvent) {
    if (e instanceof NavigationStart) {
      this.facade.setLoading(true);
    }
    if (e instanceof NavigationEnd) {
      this.appService.scrollTop(0, 0);
      this.facade.setLoading(false);
    }
    if (e instanceof NavigationCancel || e instanceof NavigationError) {
      this.facade.setLoading(false);
    }
  }

}
