import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CremPivotTableComponent } from './crem-pivot-table.component';
import { DxPivotGridModule, DxChartModule, DxDataGridModule, DxPopupModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    DxPivotGridModule,
    DxDataGridModule,
    DxChartModule,
    DxPopupModule,
  ],
  declarations: [
    CremPivotTableComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [
    CremPivotTableComponent
  ],
})
export class CremPivotTableModule {}