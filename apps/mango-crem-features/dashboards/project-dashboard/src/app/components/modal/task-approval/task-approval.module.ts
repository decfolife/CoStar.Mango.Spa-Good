import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule} from '@mango/ui-shared/lib-ui-elements';
import { TaskApprovalComponent } from './task-approval.component';
import { TextAreaModule} from '@mango/ui-shared/cosmos';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskApprovalComponent],
  imports: [
    CommonModule,
    ModalModule,
    TextAreaModule,
    FormsModule,
  ],
  exports: [TaskApprovalComponent],
  bootstrap: [],
})
export class TaskApprovalModule {}
