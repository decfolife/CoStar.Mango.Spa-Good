import { NgModule } from '@angular/core';
import {
  ActivatedRoute,
  ExtraOptions,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterModule,
  Routes,
} from '@angular/router';
import { MangoSubApps } from '@mango/data-models/lib-data-models';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { MangoAppFacade } from './+state/app/app.facade';
import { AppService } from './app.service';
import { ValidateComponent } from './components/auth/validate/validate.component';
import { CremComponent } from './components/crem-component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  // LOGIN
  {
    path: 'auth/validate',
    component: ValidateComponent
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
      { path: '', redirectTo: 'projects', pathMatch: 'full' },

      {
        path: 'projects',
        data: { moduleId: 2, breadCrumb: { label: 'Projects', append: true, activeLink: 'Projects' } },
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '@project-dashboard/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.PROJECTS_DASHBOARD,
              moduleId: 2,
              breadCrumb: { label: 'Projects Dashboard', append: false, activeLink: 'Dashboard' }
            },
          },
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
              breadCrumb: { label: 'Tasks', append: true, activeLink: 'Tasks' }
            },
          },
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
              breadCrumb: { label: 'Projects', append: true, activeLink: 'Projects' }
            },
          },

          {
            path: 'teams',
            loadChildren: () =>
              import(
                '@project-dashboard/components/teams/teams.module'
              ).then((mod) => mod.TeamsModule),
            data: {
              moduleId: 2,
              objectTypeId: null,
              breadCrumb: { append: false }
            },
          },

          {
            path: 'project-team',
            loadChildren: () =>
              import(
                '@project-dashboard/components/project-team/project-team.module'
              ).then((mod) => mod.ProjectTeamModule),
            data: {
              currentSubApp: MangoSubApps.PROJECTS_DASHBOARD,
              breadCrumb: { append: false }
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
        data: { moduleId: 1, breadCrumb: { label: 'Portfolio', append: true, activeLink: 'Portfolio' } },
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '@portfolio-dashboard/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 1,
              currentSubApp: MangoSubApps.PORTFOLIO_DASHBOARD,
              breadCrumb: { append: false }
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
              objectTypeId: 3,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Buildings', append: true, activeLink: 'Buildings'}
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
              breadCrumb: { label: 'Leases', append: true, activeLink: 'Leases' }
            },
          },
          {
            path: 'revenues',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 1,
              objectTypeId: 194,
              currentSubApp: MangoSubApps.REVENUES,
              breadCrumb: { label: 'Revenues', append: true, activeLink: 'Revenues' }
            },
          },
          {
            path: 'expenses',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 1,
              objectTypeId: 193,
              currentSubApp: MangoSubApps.EXPENSES,
              breadCrumb: { label: 'Expenses', append: true, activeLink: 'Expenses' }
            },
          },
        ]
      },

      // ACCOUNTING PATH
      {
        path: 'accounting',
        data: {
          moduleId: 9,
          breadCrumb: {
            append: true,
            label: 'Accounting'
          }
        },
        children: [
          {
            path: 'events',
            loadChildren: () =>
              import(
                '@accounting-dashboard/components/listpage/accounting-listpage/accounting-listpage.module'
              ).then((mod) => mod.AccountingListpageModule),
            data: {
              moduleId: 9,
              objectTypeId: null,
              breadCrumb: { append: false }
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
              breadCrumb: { append: false }
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
              breadCrumb: { append: false }
            },
          },
          {
            path: 'batch-accounting',
            loadChildren: () =>
              import(
                '@batch-accounting/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.BATCH_ACCOUNTING,
              breadCrumb: { append: false }
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
              breadCrumb: { append: false }
            },
          },
          // Accounting Settings
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
              breadCrumb: { append: false }
            },
          },
          {
            path: 'discountrateprofiles',
            loadChildren: () =>
              import(
                '@accounting-profile/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.ACCOUNTING_PROFILE,
              breadCrumb: { append: false }
            },
          },
          {
            path: '', loadChildren: () =>
              import(
                '@accounting-dashboard/components/index/index.module'
              ).then((mod) => mod.IndexMainModule),
            data: {
              moduleId: 9,
              currentSubApp: MangoSubApps.ACCOUNT_MANAGEMENT,
              breadCrumb: { append: false }
            }
          },
        ]
      },

      // CONTACTS
      {
        path: 'contacts',
        data: { moduleId: 3, breadCrumb: { label: null, append: false } },
        children: [
          { path: '', redirectTo: 'companies-list', pathMatch: 'full' },
          {
            path: 'companies-list',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 3,
              objectTypeId: 11,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Companies', append: true, activeLink: 'Companies' }
            },
          },
          {
            path: 'contacts-list',
            loadChildren: () =>
              import(
                '@list-pages/components/index.module.hosted'
              ).then((mod) => mod.IndexModule),
            data: {
              moduleId: 3,
              objectTypeId: 5,
              currentSubApp: MangoSubApps.LIST_PAGES,
              breadCrumb: { label: 'Contacts', append: true, activeLink: 'Contacts' }
            },
          },
        ]
      },

      // REPORTS
      {
        path: 'reports',
        data: { moduleId: 4, breadCrumb: { label: 'Reports', append: true, activeLink: 'Reports' } },
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '@reports/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.REPORTS,
              moduleId: 4,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'data-set-dictionary',
            loadChildren: () =>
              import(
                '@data-set-dictionary/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.REPORTS,
              moduleId: 4,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'financial-reporting-settings',
            loadChildren: () =>
              import(
                '@financial-reporting-settings/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.REPORTS,
              moduleId: 4,
              breadCrumb: { append: false }
            },
          }
        ]
      },

      // REMINDERS
      {
        path: 'reminders',
        data: { moduleId: 1, breadCrumb: { label: 'Reminders', append: true } },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                '@reminders-list/components/reminders-list/reminders-list.component'
              ).then((mod) => mod.RemindersListComponent),
            data: {
              moduleId: null,
              breadCrumb: { append: true }
            },
          }
        ]
      },

      // ADMIN
      {
        path: 'admin',
        data: { breadCrumb: { label: 'Admin', append: true, activeLink: 'Admin' } },
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '@user-maintenance/components/admin-landing-page/admin.module'
              ).then((mod) => mod.AdminModule),
            data: {
              moduleId: 6,
              currentSubApp: MangoSubApps.USER_MAINTENANCE,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'user-maintenance',
            loadChildren: () =>
              import(
                '@user-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.USER_MAINTENANCE,
              moduleId: null,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'service-accounts',
            loadChildren: () =>
              import(
                '@service-accounts/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.SERVICE_ACCOUNTS,
              moduleId: null,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'group-maintenance',
            loadChildren: () =>
              import(
                '@group-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.GROUP_MAINTENANCE,
              moduleId: null,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'object-maintenance',
            loadChildren: () =>
              import(
                '@object-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.OBJECT_MAINTENANCE,
              moduleId: null,
              breadCrumb: { append: false }
            },
          },
          {
            path: 'portfolio-maintenance',
            loadChildren: () =>
              import(
                '@portfolio-maintenance/components/index/index.module'
              ).then((mod) => mod.IndexModule),
            data: {
              currentSubApp: MangoSubApps.PORTFOLIO_MAINTENANCE,
              moduleId: null,
              breadCrumb: { append: false }
            },
          },
        ]
      },
      {
        path: 'forms',
        loadChildren: () =>
          import(
            '@forms/mango-forms/mango-forms.module'
          ).then((mod) => mod.MangoFormsModule),
        data: { moduleId: null, breadCrumb: { label: null, append: false } },
      },

      // Auto-generated components below
      // @!micro-component-generator: don't delete this line
    ]
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


const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload',
  scrollOffset: [0, 50],
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
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
