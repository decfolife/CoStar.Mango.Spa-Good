import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { DxPopoverModule } from 'devextreme-angular';
import { IconModule } from '../icon';


@NgModule({
  declarations: [TooltipComponent],
  imports: [CommonModule,  IconModule, DxPopoverModule],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [TooltipComponent],
})
export class TooltipModule {}
