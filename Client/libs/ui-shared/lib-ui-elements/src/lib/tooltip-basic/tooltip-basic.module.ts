import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipBasicComponent } from './tooltip-basic.component';
import { DxPopoverModule } from 'devextreme-angular';
import { IconModule } from '../icon';


@NgModule({
  declarations: [TooltipBasicComponent],
  imports: [CommonModule,  IconModule, DxPopoverModule],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [TooltipBasicComponent],
})
export class TooltipBasicModule {}
