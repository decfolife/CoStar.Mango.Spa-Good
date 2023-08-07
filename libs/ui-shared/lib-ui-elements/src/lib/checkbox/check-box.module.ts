import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { CheckBoxComponent } from './check-box.component';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    DxCheckBoxModule,
    DxValidatorModule
  ],
  declarations: [
    CheckBoxComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CheckBoxComponent,
  ],
})
export class CheckBoxModule {}
