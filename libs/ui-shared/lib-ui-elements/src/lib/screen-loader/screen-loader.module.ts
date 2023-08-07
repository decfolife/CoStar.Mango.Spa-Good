import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenLoaderComponent } from './screen-loader.component';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';

@NgModule({
  declarations: [ScreenLoaderComponent],
  imports: [CommonModule, DxLoadIndicatorModule],
  exports: [ScreenLoaderComponent],
})
export class ScreenLoaderModule {}
