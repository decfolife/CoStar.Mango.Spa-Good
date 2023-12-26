import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTeamComponent } from './project-team.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectTeamComponent,
    data: {
      breadCrumb: { label: 'Project-Team', append: true, activeLink: 'Team' }
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectTeamRoutingModule { }
