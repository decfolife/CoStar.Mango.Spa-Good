import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddBuildingModalComponent } from './add-building-modal.component';
import { ButtonModule, ModalModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';

import {
  DxButtonModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxFormModule,
  DxLoadPanelModule,
} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    ModalModule,
    DxLoadPanelModule,
    DropdownModule,
    DxButtonModule
  ],
  declarations: [AddBuildingModalComponent],
})
export class AddBuildingModalModule { }