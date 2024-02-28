
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DxPopoverModule,DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { HeroMetricsContainerComponent } from './hero-metrics-container.component';
import { HeroMetricModule, TooltipModule } from '@mango/ui-shared/lib-ui-elements';
import { DataService } from '@mango/core-shared';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [HeroMetricsContainerComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DxPopoverModule,
    DxTemplateModule,
    HeroMetricModule,
    TooltipModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [HeroMetricsContainerComponent],
  providers: [DataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroMetricsContainerModule { }
