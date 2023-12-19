import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTeamComponent } from './project-team.component';


@NgModule({
  declarations: [
    ProjectTeamComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [ProjectTeamComponent],
})
export class ProjectTeamModule { }
