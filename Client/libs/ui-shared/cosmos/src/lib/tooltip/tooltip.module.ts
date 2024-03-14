import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IconModule } from '../icon';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTemplateModule } from 'devextreme-angular';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { TooltipService } from './tooltip.service';

@NgModule({
  declarations: [TooltipComponent],
  imports: [
    CommonModule,
    //BrowserAnimationsModule,
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
