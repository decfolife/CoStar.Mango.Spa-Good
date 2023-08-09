import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { TextBoxComponent } from './text-box.component';
import { DxDateBoxModule } from 'devextreme-angular/ui/date-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    DxTextBoxModule,
    DxValidatorModule
  ],
  declarations: [
    TextBoxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    TextBoxComponent,
  ],
})
export class TextBoxModule {}
