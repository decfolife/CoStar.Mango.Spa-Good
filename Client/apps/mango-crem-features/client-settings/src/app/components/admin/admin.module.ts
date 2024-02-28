import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CardModule, LibUiElementsModule, TooltipModule } from '@mango/ui-shared/lib-ui-elements';
import { IconModule, TextFieldModule } from '@mango/ui-shared/cosmos';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DxNumberBoxModule, DxLoadPanelModule, DxTextAreaModule } from 'devextreme-angular';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    LibDataModelsModule,
    LibUiSharedModule,
    LibUiElementsModule,
    TextFieldModule,
    MatButtonModule,
    DxLoadPanelModule,
    FormsModule,
    IconModule,
    TooltipModule,
    MatSlideToggleModule,
    DxNumberBoxModule,
    DxTextAreaModule
  ],
  exports: [AdminComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AdminComponent],
})
export class AdminModule {}