import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { HierarchyDropdownComponent } from './hierarchy-dropdown.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxTemplateModule } from 'devextreme-angular/core';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxTreeViewModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    LibDataModelsModule,
    DxDropDownBoxModule,
    DxTextBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxTemplateModule,
    DxTreeViewModule
  ],
  declarations: [
    HierarchyDropdownComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HierarchyDropdownComponent,
  ],
})
export class HierarchyDropdownModule {}
