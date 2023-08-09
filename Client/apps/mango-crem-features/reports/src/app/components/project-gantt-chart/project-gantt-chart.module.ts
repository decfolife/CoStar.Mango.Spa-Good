import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProjectGanttChartComponent } from './project-gantt-chart.component';
import { ProjectGanttChartService } from './project-gantt-chart.service';
import { UserPreferencesResolver } from '../../shared/resolvers/user-preferences-resolver.service';
import { ButtonModule } from '@mango/ui-shared/lib-ui-elements';
import { DxGanttModule } from 'devextreme-angular';
import { ProjectResolver } from './project-resolver.service';

@NgModule({
  declarations: [
    ProjectGanttChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DxGanttModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Gantt Chart - Project' },
        component: ProjectGanttChartComponent
      },
      {
        path: ':projectId',
        data: { pageTitle: 'Gantt Chart - Project' },
        component: ProjectGanttChartComponent,
        resolve: { project: ProjectResolver, userPreferences: UserPreferencesResolver }
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    DatePipe,
    ProjectGanttChartService
  ]
})
export class ProjectGanttChartModule { }