import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentActivitiesComponent } from './recent-activities.component';

const routes: Routes = [
  {
    path: '',
    component: RecentActivitiesComponent,
    data: {
      breadCrumb: {
        label: 'Recent Activities',
        append: true,
        activeLink: 'Recent Activities',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentActivitiesRoutingModule {}
