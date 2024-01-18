import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import {
  DropDownButtonDirective,
  DropdownTemplateDirective,
  DropdownComponent,
} from './dropdown.component';
import { ButtonModule } from '../button';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationSummaryModule } from 'devextreme-angular/ui/validation-summary';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { MatMenuModule} from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    DxDropDownBoxModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxValidatorModule,
    DxFormModule,
    DxSelectBoxModule,
    DxValidationSummaryModule,
    MatMenuModule,
    ButtonModule,
  ],
  declarations: [
    DropdownComponent,
    DropdownTemplateDirective,
    DropDownButtonDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    DropdownComponent,
    DropdownTemplateDirective,
    DropDownButtonDirective,
  ],
})
export class DropdownModule {}
