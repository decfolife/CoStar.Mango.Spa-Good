import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { ToggleSliderComponent } from './toggle-slider.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    MatSlideToggleModule
  ],
  declarations: [
    ToggleSliderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ToggleSliderComponent,
  ],
})
export class ToggleSliderModule {}
