import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroMetricComponent } from './hero-metric.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  DxPopoverModule,
  DxButtonModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { IconModule } from '../icon';
import { TooltipBasicModule } from '../tooltip-basic';

@NgModule({
  declarations: [HeroMetricComponent],
  imports: [
    CommonModule,
    IconModule,
    TooltipBasicModule,
    DxButtonModule,
    DxPopoverModule,
    DxTemplateModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [HeroMetricComponent],
})
export class HeroMetricModule {}
