import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    title: 'Reports',
    component: IndexComponent,
    data: { breadCrumb: { append: false } },
  },
  {
    path: '',
    data: {
      breadCrumb: { append: false },
    },
    children: [
      {
        path: 'exchange-rate-sets',
        title: 'Exchange Rate Sets',
        loadChildren: () =>
          import('../exchange-rate-sets/exchange-rate-sets.module').then(
            (m) => m.ExchangeRateSetsReportModule
          ),
        data: {
          breadCrumb: { label: 'Exchange Rate Sets', append: true },
        },
      },
      {
        path: 'group-user-blocked-admin-links',
        title: 'Group User Blocked Admin Links',
        loadChildren: () =>
          import(
            '../group-user-blocked-admin-links/group-user-blocked-admin-links.module'
          ).then((m) => m.GroupUserBlockedAdminLinksModule),
        data: {
          breadCrumb: { label: 'Users Admin', append: true },
        },
      },
      {
        path: 'group-user-history',
        title: 'Group User History',
        loadChildren: () =>
          import('../group-user-history/group-user-history.module').then(
            (m) => m.GroupUserHistoryModule
          ),
        data: {
          breadCrumb: { label: 'Users History', append: true },
        },
      },
      {
        path: 'group-user-module-rights',
        title: 'Group User Module Rights',
        loadChildren: () =>
          import(
            '../group-user-module-rights/group-user-module-rights.module'
          ).then((m) => m.GroupUserModuleRightsModule),
        data: {
          breadCrumb: { label: 'Users Module Rights', append: true },
        },
      },
      {
        path: 'group-user-navigation-rights',
        title: 'Group User Navigation Rights',
        loadChildren: () =>
          import(
            '../group-user-navigation-rights/group-user-navigation-rights.module'
          ).then((m) => m.GroupUserNavigationRightsModule),
        data: {
          breadCrumb: { label: 'Users Navigation Rights', append: true },
        },
      },
      {
        path: 'project-gantt-chart',
        title: 'Gatt Chart',
        loadChildren: () =>
          import('../project-gantt-chart/project-gantt-chart.module').then(
            (m) => m.ProjectGanttChartModule
          ),
        data: {
          breadCrumb: { label: 'Project Gantt Chart', append: true },
        },
      },
      {
        path: 'sub-object-comparison',
        title: 'Sub Object Comparison',
        loadChildren: () =>
          import('../sub-object-comparison/sub-object-comparison.module').then(
            (m) => m.SubObjectComparisonModule
          ),
        data: {
          breadCrumb: { label: 'Sub Object Comparaison', append: true },
        },
      },
      {
        path: 'aws-report',
        title: 'AWS Reports',
        loadChildren: () =>
          import('../aws-report/aws-report.module').then(
            (m) => m.AWSReportModule
          ),
        data: {
          breadCrumb: { label: 'AWS Report', append: true },
        },
      },
      {
        path: 'reports-segment',
        title: 'Segments',
        loadChildren: () =>
          import('../reports-segment/reports-segment.module').then(
            (m) => m.ReportsSegmentModule
          ),
        data: {
          breadCrumb: {
            label: 'Segments',
            append: true,
            activeLink: 'Segments',
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
