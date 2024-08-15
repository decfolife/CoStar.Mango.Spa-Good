import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, CremFormsModule, DropdownModule, InputComponent, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { AddBuildingModalComponent } from './add-building-modal.component';

import { ReactiveFormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTextAreaModule,
} from 'devextreme-angular';

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
    CremFormsModule
  ],
  declarations: [AddBuildingModalComponent],
})
export class AddBuildingModalModule { }