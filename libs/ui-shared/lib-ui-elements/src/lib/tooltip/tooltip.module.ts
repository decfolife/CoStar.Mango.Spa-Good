import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import {
  DxDataGridModule,
  DxPopoverModule,
  DxTemplateModule,
  DxBulletModule,
} from 'devextreme-angular';
import { IconModule } from '../icon';

import { MatTabsModule } from '@angular/material/tabs';
import { TooltipService } from './tooltip.service';

@NgModule({
  declarations: [TooltipComponent],
  imports: [
    CommonModule,
    IconModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxPopoverModule,
    MatTabsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [TooltipService],
  exports: [TooltipComponent],
})
export class TooltipModule {}
