import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { DxTooltipModule } from 'devextreme-angular';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidationSummaryModule } from 'devextreme-angular/ui/validation-summary';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { ButtonModule } from '../button';
import { ErrorTooltipComponent } from '../error-tooltip';
import { IconModule } from '../icon';
import { InputLabelComponent } from '../input/label';
import {
  DropDownButtonDirective,
  DropdownComponent,
  DropdownTemplateDirective,
} from './dropdown.component';
import { CremPipesModule } from 'libs/core-shared/src/lib/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    CremPipesModule,
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
    IconModule,
    DxTooltipModule,
    ErrorTooltipComponent,
    InputLabelComponent,
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
