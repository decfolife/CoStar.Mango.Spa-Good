import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTasksComponent } from './project-tasks.component';


@NgModule({
  declarations: [
    ProjectTasksComponent,

  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [ProjectTasksComponent],
})
export class ProjectTasksModule { }
