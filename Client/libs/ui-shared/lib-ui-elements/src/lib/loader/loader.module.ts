import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, DxLoadIndicatorModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}
