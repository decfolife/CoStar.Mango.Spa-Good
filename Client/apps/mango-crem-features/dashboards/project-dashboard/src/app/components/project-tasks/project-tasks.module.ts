import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  ButtonModule,
  CremPopupComponent,
  CremTabItemComponent,
  CremTabsComponent,
  DatePickerModule,
  DropdownModule,
  IconModule,
  LoaderModule,
  ModalModule,
  NumberBoxComponent,
  ToggleSliderComponent,
  TooltipModule,
  CheckBoxComponent,
} from '@mango/ui-shared/lib-ui-elements';
import {
  CremShareViewPopupModule,
  CremViewMenuModule,
} from '@mango/ui-shared/lib-ui-shared';
import { TaskFilesComponent } from './task-info/task-files/task-files.component';
import { AddEditTaskAssigneesComponent } from './task-info/task-assignees/add-edit-task-assignees/add-edit-task-assignees.component';
import { InputComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/input';
import { CopyTransactionComponent } from './copy-transaction/copy-transaction.component';
import { AppendTemplateComponent } from './append-template/append-template.component';
import { CremQuickApprovalComponent } from './quick-approval/quick-approval.component';
import { TaskInfoUIService } from '@project-dashboard/services/task-info-ui.service';
import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxSortableModule,
  DxTabPanelModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTreeListModule,
  DxTreeViewModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { TaskApproveOrRejectComponent } from '../modal/task-approve-or-reject/task-approve-or-reject.component';
import { AddEditTaskComponent } from './add-edit-tasks/add-edit-task.component';
import { ProjectTasksComponent } from './project-tasks.component';
import { UploadPopupComponent } from './task-info/files-upload/upload-popup/upload-popup.component';
import { TaskAssigneesComponent } from './task-info/task-assignees/task-assignees.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { AddTaskNoteComponent } from './task-info/task-notes/add-task-note/add-task-note.component';
import { TaskNotesComponent } from './task-info/task-notes/task-notes.component';
import { CremSaveTasksTemplateComponent } from './save-tasks-template/save-tasks-template.component';
import { CremCurrentObjectTextModule } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-current-object-text/crem-current-object-text.module';
import {
  ReorderTaskModal,
  ReorderTasksModalComponent,
} from './reorder-tasks-modal/reorder-tasks-modal.component';

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
    AppendTemplateComponent,
    ReorderTasksModalComponent,
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
    DxSortableModule,
    DxTreeViewModule,
    DropdownModule,
    LoaderModule,
    ModalModule,
    FontAwesomeModule,
    NumberBoxComponent,
    CremTabsComponent,
    ToggleSliderComponent,
    CremTabItemComponent,
    CremPopupComponent,
    CremCurrentObjectTextModule,
    MatIconModule,
    DxValidatorModule,
    SearchModule,
    CremViewMenuModule,
    CremShareViewPopupModule,
    IconModule,
    InputComponent,
    TooltipModule,
    UploadPopupComponent,
    DxTemplateModule,
    CremQuickApprovalComponent,
    CremSaveTasksTemplateComponent,
    TaskApproveOrRejectComponent,
  ],
  providers: [TaskInfoUIService, ReorderTaskModal],
  exports: [ProjectTasksComponent],
})
export class ProjectTasksModule {}
