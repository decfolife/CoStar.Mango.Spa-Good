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
import { ShareReportComponent } from './modals/share-report/share-report.component';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';

@NgModule({
  declarations: [ReportsHomeComponent, ShareReportComponent],
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
    ModalModule,
  ],
  exports: [ReportsHomeComponent],
})
export class ReportsHomeModule {}
