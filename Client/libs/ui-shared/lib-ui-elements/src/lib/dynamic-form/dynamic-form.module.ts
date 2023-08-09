import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxFormModule,
  DxListModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxValidationSummaryModule,
  DxCheckBoxModule
} from 'devextreme-angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DatePickerModule } from '../date-picker';
import { TextBoxModule } from '../text-box/text-box.module';
import { ToggleSliderModule } from '../toggle-slider/toggle-slider.module';
import { CheckBoxModule } from '../checkbox/check-box.module';

@NgModule({
  imports: [
    CommonModule,
    DxListModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxFormModule,
    DropdownModule,
    DatePickerModule,
    TextBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    MatSlideToggleModule,
    ToggleSliderModule,
    CheckBoxModule
  ],
  declarations: [
    DynamicFormComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    DynamicFormComponent
  ],
})
export class DynamicFormModule {}