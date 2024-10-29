import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsHomeComponent } from './reports-home.component';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  DropdownModule,
  ButtonModule,
  LoaderModule,
  IconModule,
} from '@mango/ui-shared/lib-ui-elements';
import { MatIconModule } from '@angular/material/icon';
import { DxDataGridModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ReportsHomeComponent],
  imports: [
    CommonModule,
    SearchModule,
    DropdownModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    MatMenuModule,
    LoaderModule,
    IconModule,
  ],
  exports: [ReportsHomeComponent],
})
export class ReportsHomeModule {}
