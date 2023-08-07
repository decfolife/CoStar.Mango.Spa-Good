import { ContactSelectModule } from './../contact-select/contact-select.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSelectComponent } from './customer-select.component';
import { DxCheckBoxModule, DxDataGridModule, DxLoadPanelModule, DxPopupModule, DxSelectBoxModule, DxTooltipModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { LoaderModule } from '@mango/ui-shared/cosmos';
import { DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { CremHeaderModule } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-header/crem-header.module';
import { CustomerSelectionListComponent } from './customer-selection-list/customer-selection-list.component';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    CustomerSelectComponent,
    CustomerSelectionListComponent
  ],
  exports: [CustomerSelectionListComponent],
  imports: [
    CommonModule,
    DxLoadPanelModule,
    ContactSelectModule,
    NavbarModule,
    RouterModule,
    ReactiveFormsModule,
    LibDataModelsModule,
    LibUiSharedModule,
    DxSelectBoxModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DropdownModule,
    DxTooltipModule,
    DxPopupModule,
    DxLoadPanelModule,
    CremHeaderModule,
    LoaderModule
  ]
})
export class CustomerSelectModule { }
