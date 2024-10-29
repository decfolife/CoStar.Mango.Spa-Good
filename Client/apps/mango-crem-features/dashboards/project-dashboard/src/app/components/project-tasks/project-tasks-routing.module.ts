import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTasksComponent } from './project-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectTasksComponent,
    data: {
      breadCrumb: { label: 'Project-Tasks', append: true, activeLink: 'Tasks' },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectTasksRoutingModule {}
