import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ShadowFiltersContainerComponent } from './shadow-filters-container.component';


@NgModule({
  declarations: [ShadowFiltersContainerComponent],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule
  ],
  exports: [ShadowFiltersContainerComponent]
})
export class ShadowFiltersContainerModule {
}
