import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactSelectComponent } from './contact-select.component';
import { DxCheckBoxModule, DxDataGridModule, DxLoadPanelModule, DxPopupModule } from 'devextreme-angular';
import { UserRecordsPopupComponent } from '../customer-select/user-records-popup/user-records-popup.component';

@NgModule({
  declarations: [
    ContactSelectComponent,
    UserRecordsPopupComponent
  ],
  imports: [
    CommonModule,
    DxLoadPanelModule,
    DxPopupModule,
    DxDataGridModule,
    DxCheckBoxModule
  ],
  exports: [ContactSelectComponent, UserRecordsPopupComponent]
})
export class ContactSelectModule { }