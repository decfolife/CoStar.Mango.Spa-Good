import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  ModalModule,
  DropdownModule,
  CremFormsModule,
  InputComponent,
  DatePickerModule,
} from '@mango/ui-shared/lib-ui-elements';
import { AddLeaseModalComponent } from './add-lease-modal.component';

import {
  DxButtonModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxFormModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    ModalModule,
    DxLoadPanelModule,
    DropdownModule,
    DxButtonModule,
    InputComponent,
    CremFormsModule,
    DatePickerModule,
  ],
  declarations: [AddLeaseModalComponent],
})
export class AddLeaseModalModule {}
