import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule, LoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { TaskApprovalComponent } from './task-approval.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskApprovalComponent],
  imports: [CommonModule, ModalModule, LoaderModule, FormsModule],
  exports: [TaskApprovalComponent],
  bootstrap: [],
})
export class TaskApprovalModule {}
