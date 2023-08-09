import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { VerticalStepperComponent } from './vertical-stepper.component';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
  ],
  declarations: [
    VerticalStepperComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    VerticalStepperComponent,
  ],
})
export class VerticalStepperModule {}
