import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
  DxTabPanelModule,
  DxTextAreaModule,
  DxValidatorModule,
  DxTreeListModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectTasksComponent } from './project-tasks.component';
import {
  ButtonModule,
  DatePickerModule,
  DropdownModule,
  LoaderModule,
  ModalModule,
  ToggleSliderComponent,
  NumberBoxComponent,
  CremTabsComponent,
  CremTabItemComponent,
  CremPopupComponent,
  TooltipModule,
  CheckBoxComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { AddEditTaskComponent } from './add-edit-tasks/add-edit-task.component';
import { MatIconModule } from '@angular/material/icon';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskNotesComponent } from './task-info/task-notes/task-notes.component';
import { AddTaskNoteComponent } from './task-info/task-notes/add-task-note/add-task-note.component';
import { TaskAssigneesComponent } from './task-info/task-assignees/task-assignees.component';
import {
  CremShareViewPopupModule,
  CremViewMenuModule,
} from '@mango/ui-shared/lib-ui-shared';
import { TaskFilesComponent } from './task-info/task-files/task-files.component';
import { IconModule } from '@mango/ui-shared/lib-ui-elements';
import { AddEditTaskAssigneesComponent } from './task-info/task-assignees/add-edit-task-assignees/add-edit-task-assignees.component';
import { TaskModifyCompleteDateComponent } from './task-modify-complete-date/task-modify-complete-date.component';
import { InputComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/input';
import { CopyTransactionComponent } from './copy-transaction/copy-transaction.component';
import { AppendTemplateComponent } from './append-template/append-template.component';
import { CremQuickApprovalComponent } from './quick-approval/quick-approval.component';
import { CremSaveTasksTemplateComponent } from './save-tasks-template/save-tasks-template.component';

@NgModule({
  declarations: [
    ProjectTasksComponent,
    AddEditTaskComponent,
    CopyTransactionComponent,
    TaskInfoComponent,
    TaskNotesComponent,
    AddTaskNoteComponent,
    TaskAssigneesComponent,
    TaskFilesComponent,
    AddEditTaskAssigneesComponent,
    TaskModifyCompleteDateComponent,
    AppendTemplateComponent,
  ],
  imports: [
    CommonModule,
    CheckBoxComponent,
    ButtonModule,
    CheckBoxComponent,
    FontAwesomeModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    DatePickerModule,
    DxTextAreaModule,
    DxTabPanelModule,
    DxDataGridModule,
    DxTreeListModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DropdownModule,
    LoaderModule,
    ModalModule,
    FontAwesomeModule,
    NumberBoxComponent,
    CremTabsComponent,
    ToggleSliderComponent,
    CremTabItemComponent,
    CremPopupComponent,
    MatIconModule,
    DxValidatorModule,
    SearchModule,
    CremViewMenuModule,
    CremShareViewPopupModule,
    IconModule,
    InputComponent,
    TooltipModule,
    CremQuickApprovalComponent,
    CremSaveTasksTemplateComponent,
  ],
  providers: [],
  exports: [ProjectTasksComponent],
})
export class ProjectTasksModule {}
