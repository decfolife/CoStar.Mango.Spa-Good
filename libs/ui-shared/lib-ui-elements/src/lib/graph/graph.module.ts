import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph.component';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxTooltipModule } from 'devextreme-angular/ui/tooltip';

@NgModule({
  imports: [CommonModule, DxChartModule, DxTooltipModule],
  declarations: [GraphComponent],
  exports: [GraphComponent],
})
export class GraphModule {}
