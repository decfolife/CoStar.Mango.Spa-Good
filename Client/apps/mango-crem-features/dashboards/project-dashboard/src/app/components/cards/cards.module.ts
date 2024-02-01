import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CardModule, DropdownModule, LoaderModule, ModalModule, SimpleGridModule } from '@mango/ui-shared/lib-ui-elements';
import {SearchModule, ChipModule, TextAreaModule} from '@mango/ui-shared/cosmos';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { CardContentDirective } from './cardContent.directive';
import { CardsComponent } from './cards.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { TasksDueSoonComponent } from './tasks-due-soon/tasks-due-soon.component';
import { ProjectsByTypeComponent } from './projects-by-type/projects-by-type.component';
import { NewTasksComponent } from './new-tasks/new-tasks.component';
import { NewProjectsComponent } from './new-projects/new-projects.component';
import { TasksDueThisWeekComponent } from './tasks-due-this-week/tasks-due-this-week.component';
import { OverdueProjectsComponent } from './overdue-projects/overdue-projects.component';
import { OverdueTasksComponent } from './overdue-tasks/overdue-tasks.component';
import { ActivityFeedComponent } from './activity-feed/activity-feed.component';
import { ProjectMilestonesComponent } from './project-milestones/project-milestones.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TaskApprovalModule } from '../modal/task-approval/task-approval.module';
import { ExportDevexDatagridService } from '@mango/core-shared';


// eslint-disable-next-line max-len
const WARNING = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
@NgModule({
  declarations: [CardsComponent, TasksDueSoonComponent, ProjectsByTypeComponent, NewTasksComponent, NewProjectsComponent, TasksDueThisWeekComponent, OverdueProjectsComponent, OverdueTasksComponent, ActivityFeedComponent, ProjectMilestonesComponent],
  imports: [
    CommonModule,
    DropdownModule,
    SimpleGridModule,
    ChipModule,
    LoaderModule,
    DragDropModule,
    SearchModule,
    DxDataGridModule,
    DxTemplateModule,
    DxChartModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatIconModule,
    CardModule,
    ModalModule,
    TextAreaModule,
    NgxSkeletonLoaderModule,
    TaskApprovalModule,
    FormsModule
  ],
  exports: [CardsComponent],
  providers: [CardContentDirective, ExportDevexDatagridService],
  bootstrap: [CardsModule],
})
export class CardsModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    // Note that we provide the icon here as a string literal here due to a limitation in
    // Stackblitz. If you want to provide the icon from a URL, you can use:
    // `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
    iconRegistry.addSvgIconLiteral(
      'warning',
      sanitizer.bypassSecurityTrustHtml(WARNING)
    );
  }
}
