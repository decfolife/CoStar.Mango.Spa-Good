import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { RecentActivitiesComponent } from '../recent-activities/recent-activities.component';
import { AppRoutingTitle } from '@mango/data-models/lib-data-models';

const routes: Routes = [
  {
    path: 'recent-activities',
    loadChildren: () =>
      import('../recent-activities/recent-activities.module').then(
        (mod) => mod.RecentActivitiesModule
      ),
    title: AppRoutingTitle + 'Recent Activities',
    data: {
      breadCrumb: { append: false },
    },
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('../teams/teams-routing.module').then(
        (mod) => mod.TeamsRoutingModule
      ),
    title: AppRoutingTitle + 'Team Templates',
    data: {
      breadCrumb: { append: false },
    },
  },
  {
    path: 'project-team',
    loadChildren: () =>
      import('../project-team/project-team-routing.module').then(
        (mod) => mod.ProjectTeamRoutingModule
      ),
    title: AppRoutingTitle + 'Teams',
    data: {
      breadCrumb: { label: 'Project-Team', append: false },
    },
  },
  {
    path: 'project-tasks',
    loadChildren: () =>
      import('../project-tasks/project-tasks-routing.module').then(
        (mod) => mod.ProjectTasksRoutingModule
      ),
    title: AppRoutingTitle + 'Tasks Page',
    data: {
      breadCrumb: { label: 'Project-Tasks', append: false },
    },
  },
  {
    path: '',
    component: IndexComponent,
    title: AppRoutingTitle + 'Project Dashboard',
    data: {
      breadCrumb: {
        label: 'Dashboard',
        append: true,
        activeLink: 'Dashboard',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
