import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, DropdownModule, ModalModule, IconModule } from '@mango/ui-shared/lib-ui-elements';
import { ComposeEmailComponent } from './compose-email.component';
import { DxTextAreaModule, DxCheckBoxModule, DxDataGridModule } from 'devextreme-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ComposeEmailComponent],
  imports: [
    CommonModule, ButtonModule, DragDropModule, MatIconModule, DxTextAreaModule, DxCheckBoxModule, DxDataGridModule,
    DropdownModule, ModalModule, FontAwesomeModule, IconModule
  ],
  exports: [ComposeEmailComponent]
})
export class ComposeEmailModule {
}
