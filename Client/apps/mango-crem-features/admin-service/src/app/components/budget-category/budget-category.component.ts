import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserDeletionComponent } from '../index/modal/user-deletion/user-deletion.component';
import { BudgetCategoryService } from './budget-category.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.scss'],
})
export class BudgetCategoryComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public columns: any[];
  public budgetCategoryData: any[] = [
    { id: 1, subCategory: 'Category', name: '1_Professional Fees1' },
    { id: 2, subCategory: '1_Professional Fees1', name: 'item 1' },
    { id: 3, subCategory: '1_Professional Fees1', name: 'item 2' },
    { id: 4, subCategory: '1_Professional Fees1', name: 'item 3' },
    { id: 5, subCategory: '1_Professional Fees1', name: 'item 4' },
    { id: 6, subCategory: '2_Construction', name: 'item 5' },
    { id: 7, subCategory: '2_Construction', name: 'item 6' },
    { id: 8, subCategory: '2_Construction', name: 'item 7' },
    { id: 9, subCategory: '2_Construction', name: 'item 8' },
  ];

  public parentCategories: any = [
    {
      id: '1_Professional Fees1',
      name: '1_Professional Fees1',
    },
  ];
  public searchText: string = '';

  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.buildColumns();
  }

  public addCategory() {}

  public addSubCategory() {
    this.dataGrid.instance.addRow();
  }

  public exportGrids() {}

  public editCategory(e) {
    console.log('e', e);
    const rowIndex = e.rowIndex;
    this.dataGrid.instance.editRow(rowIndex);
  }

  public searchDataGrid(data: string): void {
    this.searchText = data;
    this.dataGrid?.instance?.searchByText(data);
  }

  private buildColumns() {
    this.columns = [
      {
        dataField: 'id',
        alignment: 'left',
        visible: true,
        dataType: 'number',
        caption: 'Contact ID',
      },
      {
        dataField: 'subCategory',
        caption: 'Master Categories',
        alignment: null,
        visible: true,
        dataType: null,
        groupIndex: '2',
      },
      {
        dataField: 'name',
        caption: 'Name',
        alignment: null,
        visible: true,
        dataType: null,
      },
    ];
  }
}
