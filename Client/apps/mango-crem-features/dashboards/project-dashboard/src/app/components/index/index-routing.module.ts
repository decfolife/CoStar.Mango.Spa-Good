import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';

const routes: Routes = [
  {
    path: 'recent-activities',
    loadChildren: () =>
      import(
        '../recent-activities/recent-activities.module'
      ).then((mod) => mod.RecentActivitiesModule),
    data: {
      breadCrumb: { append: false }
    },
  },
  {
    path: 'teams',
    loadChildren: () =>
      import(
        '../teams/teams-routing.module'
      ).then((mod) => mod.TeamsRoutingModule),
    data: {
      breadCrumb: { append: false }
    },
  },
  {
    path: 'project-team',
    loadChildren: () =>
      import(
        '../project-team/project-team-routing.module'
      ).then((mod) => mod.ProjectTeamRoutingModule),
    data: {
      breadCrumb: { label: 'Project-Team', append: false }
    },
  },
  {
    path: 'project-tasks',
    loadChildren: () =>
      import(
        '../project-tasks/project-tasks-routing.module'
      ).then((mod) => mod.ProjectTasksRoutingModule),
    data: {
      breadCrumb: { label: 'Project-Tasks', append: false }
    },
  },
  {
    path: '',
    component: IndexComponent,
    data: {
      breadCrumb: { label: 'Dashboard', append: true, activeLink: 'Dashboard' }
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
