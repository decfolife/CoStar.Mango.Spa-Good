import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: '',
    children: [
      {
        path: 'exchange-rate-sets',
        loadChildren: () => import('../exchange-rate-sets/exchange-rate-sets.module')
          .then(m => m.ExchangeRateSetsReportModule)
      },
      {
        path: 'group-user-blocked-admin-links',
        loadChildren: () => import('../group-user-blocked-admin-links/group-user-blocked-admin-links.module')
          .then(m => m.GroupUserBlockedAdminLinksModule)
      },
      {
        path: 'group-user-history',
        loadChildren: () => import('../group-user-history/group-user-history.module')
          .then(m => m.GroupUserHistoryModule)
      },
      {
        path: 'group-user-module-rights',
        loadChildren: () => import('../group-user-module-rights/group-user-module-rights.module')
          .then(m => m.GroupUserModuleRightsModule)
      },
      {
        path: 'group-user-navigation-rights',
        loadChildren: () => import('../group-user-navigation-rights/group-user-navigation-rights.module')
          .then(m => m.GroupUserNavigationRightsModule)
      },
      {
        path: 'project-gantt-chart',
        loadChildren: () => import('../project-gantt-chart/project-gantt-chart.module')
          .then(m => m.ProjectGanttChartModule)
      },
      {
        path: 'sub-object-comparison',
        loadChildren: () => import('../sub-object-comparison/sub-object-comparison.module')
          .then(m => m.SubObjectComparisonModule)
      },
      {
        path: 'aws-report',
        loadChildren: () => import('../aws-report/aws-report.module')
          .then(m => m.AWSReportModule)
      },
      {
        path: 'reports-segment',
        loadChildren: () => import('../reports-segment/reports-segment.module')
          .then(m => m.ReportsSegmentModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
