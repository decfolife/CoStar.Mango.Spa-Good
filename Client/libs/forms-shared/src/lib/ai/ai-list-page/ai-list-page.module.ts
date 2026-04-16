import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  ButtonModule,
  DropdownModule,
  SkeletonModule,
} from '@mango/ui-shared/lib-ui-elements';
import { ExportDevexDatagridService } from '@mango/core-shared';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAiLeaseModalModule } from 'libs/ui-shared/lib-ui-shared/src/lib/add-ai-lease-modal/add-ai-lease-modal.module';
import { AiListPageComponent } from './ai-list-page.component';

@NgModule({
  declarations: [AiListPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
    SearchModule,
    ButtonModule,
    DropdownModule,
    SkeletonModule,
    MatDialogModule,
    AddAiLeaseModalModule,
  ],
  providers: [ExportDevexDatagridService],
  exports: [AiListPageComponent],
})
export class AiListPageModule {}
