import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    data: {
      breadCrumb: { label: 'Teams Template', append: true, activeLink: 'Teams Template' }
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule { }
