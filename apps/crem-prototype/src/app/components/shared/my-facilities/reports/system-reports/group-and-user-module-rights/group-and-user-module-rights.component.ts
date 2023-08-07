import { Component, OnInit, ViewChild } from '@angular/core';
import { DropdownField, Service } from '../../../../../../app.service';
import { DxDataGridComponent, DxTreeViewComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import {saveAs} from 'file-saver-es';

@Component({
  selector: 'group-and-user-module-rights',
  templateUrl: './group-and-user-module-rights.component.html',
  styleUrls: ['./group-and-user-module-rights.component.scss']
})
export class GroupAndUserModuleRightsComponent implements OnInit {

  userData: Array<any>;
  groupData: Array<any>;
  groupColumns : Array<any>;
  userColumns : Array<any>;
  selectedModuleNames: Array<string> = [];
  treeDataSource: any;
  tabs: any;
  isApplied = false;
  dropdownData: DropdownField;

  @ViewChild(DxTreeViewComponent, { static: false }) treeView;
  @ViewChild('userDataGrid', { static: false }) userDataGrid: DxDataGridComponent;
  @ViewChild('groupDataGrid', { static: false }) groupDataGrid: DxDataGridComponent;
  @ViewChild('filterDataGrid', { static: false }) filterDataGrid: DxDataGridComponent;

  constructor(
    public service : Service
  ) { }

  ngOnInit() {
    this.tabs = [{ "title": "User Rights", "template":"userRights" }, { "title": "Group Rights", "template":"groupRights" }, { "title": "Module Description", "template":"moduleDescription" }]; 
    this.getGroupAndUserModuleRights();
    this.treeDataSource = [
      {
        expanded: true,
        id: 'journalEntryExport',
        name: 'Journal Entry Export'
      },
      {
        expanded: true,
        id: 'lease',
        name: 'Lease'
      },
      {
        expanded: true,
        id: 'listPage',
        name: 'List Page'
      },
      {
        expanded: true,
        id: 'mainHome',
        name: 'Main Home'
      },
      {
        expanded: true,
        id: 'market',
        name: 'Market'
      },
      {
        expanded: true,
        id: 'portfolio',
        name: 'Portfolio'
      },
      {
        expanded: true,
        id: 'region',
        name: 'Region'
      },
      {
        expanded: true,
        id: 'report',
        name: 'Report'
      },
    ];

    this.dropdownData = {
      items: this.treeDataSource,
      valueExpr: "id",
      displayExpr: "name",
      placeholder: "Module",
      controlType: "dropdown",
      selected: this.selectedModuleNames,
      visible: true,
      selectMode: "multiple",
      showColumnHeader: true,
      showSearchRow: true,
      allowClear: true,
    }
  }

  public onContentReady(event) {

  }

  public onCellPrepared(e) {
    if(e.rowType === "data") {
      if (e.data[e.column.dataField] === "Add") {
        e.cellElement.style.backgroundColor = "#dff0d8"
      }

      if (e.data[e.column.dataField] === "Delete") {
        e.cellElement.style.backgroundColor = "#f2dede"
      }

      if (e.data[e.column.dataField] === "View") {
        e.cellElement.style.backgroundColor = "#d9edf7"
      }
    }

  }

  public syncTreeViewSelection(e) {
    this.selectedModuleNames = e;
}

  public setColumnContent() {
    this.userColumns = [
			{
        dataField: "id",
				alignment: null,
				visible: true,
				dataType: "number"
			},
			{
        dataField: "user",
				alignment: null,
				visible: true,
				dataType: "string"
      },
      {
        dataField: "securityRole",
				alignment: null,
				visible: true,
				dataType: "string"
			},
			{
				dataField: "company",
				alignment: null,
				visible: true,
				dataType: "string"
			},
			{
        dataField: "primaryGroup",
				alignment: null,
				visible: true,
				dataType: "string"
			}
    ];

    this.groupColumns = [
      {
        dataField: "id",
        alignment: null,
        visible: true,
        dataType: "number"
      },
      {
        dataField: "securityGroup",
        alignment: null,
        visible: true,
        dataType: "string"
      }

    ];
    this.selectedModuleNames.forEach((module) => {
      const item = this.treeDataSource.find((data) => {
        return data.id === module
      })

      this.userColumns.push(
        {
          dataField: module,
          alignment: null,
          caption: item.name,
          visible: true,
          dataType: "string"
        }
      );
      this.groupColumns.push(
        {
          dataField: module,
          caption: item.name,
          alignment: null,
          visible: true,
          dataType: "string"
        }
      )
    })
    
    this.isApplied = true;
  }

  public getGroupAndUserModuleRights() {
    this.userData = this.service.getUserModuleRights();
    this.groupData = this.service.getGroupModuleRights();
  }

  public searchDataGrid(data) {
    this.userDataGrid.instance.searchByText(data);
    this.groupDataGrid.instance.searchByText(data);
  }

  public apply() {
    this.setColumnContent();
  }
  
  public exportGrids(e) {
		const workbook = new ExcelJS.Workbook();
		const usersSheet = workbook.addWorksheet('Users');
    const groupsSheet = workbook.addWorksheet('Groups');
    const filterSheet = workbook.addWorksheet('filters')

		usersSheet.getRow(2).getCell(2).value = 'Users';
		usersSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

		groupsSheet.getRow(2).getCell(2).value = 'Groups';
    groupsSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

		const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = {argb: '00558E'}
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' }};
      }
			if (gridCell.rowType === 'data') {
        
				if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "Add") {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'dff0d8' }, bgColor: { argb: 'dff0d8' }};
        }
        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "View") {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd9edf7' }, bgColor: { argb: 'd9edf7' }};
        }
        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField] === "Delete") {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f2dede' }, bgColor: { argb: 'f2dede' }};
				}
      }
    }
    
    const filters = this.userDataGrid.instance.getCombinedFilter();
    const userFilter = this.userDataGrid.instance.columnOption("user", "filterValues") || [];
    const groupFilter = this.groupDataGrid.instance.columnOption("securityGroup", "filterValues") || []
    filterSheet.getRow(2).getCell(2).value = 'Filters';
    filterSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    filterSheet.getRow(4).getCell(2).value = 'Users';
    filterSheet.getRow(4).getCell(3).value = 'Security Group';
    filterSheet.getRow(4).getCell(4).value = 'Module';
    let userRow = 0;
    let groupRow = 0;
    userFilter.forEach((user) => {
      userRow++;
      filterSheet.getRow(4 + userRow).getCell(2).value = user;
    })
    groupFilter.forEach((group) => {
      groupRow++;
      filterSheet.getRow(4 + groupRow).getCell(3).value = group;
    })

		exportDataGrid({
			worksheet: usersSheet,
			component: this.userDataGrid.instance,
			topLeftCell: { row: 4, column: 2 },
			customizeCell: ({ gridCell, excelCell }) => {
				setBackground(gridCell, excelCell)
			}
		}).then(() => {
			return exportDataGrid({
				worksheet: groupsSheet,
				component: this.groupDataGrid.instance,
				topLeftCell: { row: 4, column: 2 },
				customizeCell: ({ gridCell, excelCell }) => {
					setBackground(gridCell, excelCell)
				}
			});
		}).then(() => {
			return exportDataGrid({
        worksheet: filterSheet,
        component: this.filterDataGrid?.instance,
				topLeftCell: { row: 4, column: 2 },
				customizeCell: ({ gridCell, excelCell }) => {
					setBackground(gridCell, excelCell)
				}
			});
		}).then(() => {   
			workbook.xlsx.writeBuffer().then((buffer) => {
				saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'MultipleGrids.xlsx');
			});
		});
	}
}