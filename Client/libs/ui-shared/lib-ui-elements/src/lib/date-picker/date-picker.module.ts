import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { DatePickerComponent } from './date-picker.component';
import { DxValidationSummaryModule } from 'devextreme-angular/ui/validation-summary';
import { DxDateBoxModule, DxValidatorModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    DxDateBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule
  ],
  declarations: [
    DatePickerComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    DatePickerComponent,
  ],
})
export class DatePickerModule {}
