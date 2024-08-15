import { Component, Input, ViewChild } from '@angular/core';
import {
  DxBulletModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
  DxSelectBoxModule,
  DxTemplateModule,
} from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button';
import DxDataGrid from 'devextreme/ui/data_grid';
@Component({
  selector: 'crem-master-detail',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxBulletModule,
    ButtonModule,
    DxTemplateModule,
    DxLoadPanelModule,
    DxSelectBoxModule
  ],
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.scss'],
})
export class MasterDetailComponent {
  @Input() id: string;
  @Input() content: any;
  @Input() keyExpr: string;
  @Input() allowedPageSizes = [25, 50, 100, 500, 'all'];
  @Input() showPageSizeSelector = true;
  @Input() showPageInfo = true;
  @Input() showNavButtons = true;
  @Input() defaultPageSize = '10';
  @Input() columnsToHide: string[];
  @Input() allowColumnReordering = true;
  @Input() columnAutoWidth = false;
  @Input() showRowLines = true;
  @Input() rowAlternationEnabled = true;
  @Input() showColumnLines = false;

  @ViewChild('masterGrid') masterGrid: DxDataGridComponent;

  private detailGridsInstances: { [index: number]: DxDataGrid } = {}

  selectionChangedHandler(event) {
    const { currentSelectedRowKeys, currentDeselectedRowKeys } = event
    currentSelectedRowKeys.forEach(selectedRow => {
      this.masterGrid.instance.expandRow(selectedRow)
      this.detailGridsInstances[selectedRow].selectAll()
    })
    currentDeselectedRowKeys.forEach(unselectedRow => {
      this.detailGridsInstances[unselectedRow].deselectAll()
    })
  }

  detailGridInitialized(event, index) {
    const detailGridComponent = event.component as DxDataGrid
    this.detailGridsInstances[index] = detailGridComponent
  }

  onContentReady() {
    this.columnsToHide.forEach((element) => {
      this.masterGrid.instance.columnOption(element, 'visible', false);
    });
  }
}
