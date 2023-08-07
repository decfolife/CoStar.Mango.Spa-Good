import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DropdownField, Service } from '../../../../../../app.service';
import { DxDataGridComponent, DxTreeViewComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import {saveAs} from 'file-saver-es';

import { centerColumnsModel, GroupAndUserNavigationRights, leaseColumnsModel, marketColumnsmodel, storeColumnsModel } from '../../../../../../models/group-and-user-navigation-rights.model';

@Component({
  selector: 'group-and-user-navigation-rights',
  templateUrl: './group-and-user-navigation-rights.component.html',
  styleUrls: ['./group-and-user-navigation-rights.component.scss']
})
export class GroupAndUserNavigationRightsComponent implements OnInit {

  navigationRightsData: GroupAndUserNavigationRights;
  filteredNavigationRightsData: GroupAndUserNavigationRights| {} = {};
  selectedModules: Array<string> = [];
  selectedUsers: Array<string> = [];
  selectedGroups: Array<string> = [];
  moduleDataSource: any;
  userDataSource: any;
  groupDataSource: any;
  tabs: any;
  isApplied = false;
  moduleDropdownData: DropdownField;
  userDropdownData: DropdownField;
  groupDropdownData: DropdownField;
  reportcolumns: any;

  @ViewChild(DxTreeViewComponent, { static: false }) treeView;
  @ViewChildren('reportDataGrid') reportDataGrid: QueryList<DxDataGridComponent>

  constructor(
    public service : Service
  ) { }

  ngOnInit() {
    this.getGroupAndUserNavigationRights();
    this.buildModuleDataSource();
    this.buildUserDataSource();
    this.buildGroupDataSource();

  }

  public buildModuleDataSource() {
    this.moduleDataSource = [
      {
        expanded: true,
        id: 'center',
        name: 'Center: Center (300)'
      },
      {
        expanded: true,
        id: 'lease',
        name: 'Lease: Lease (400)'
      },
      {
        expanded: true,
        id: 'market',
        name: 'Market: Market (11500)'
      },
      {
        expanded: true,
        id: 'store',
        name: 'Store: Store (200)'
      },
    ];

    this.moduleDropdownData = {
      items: this.moduleDataSource,
      valueExpr: "id",
      displayExpr: "name",
      placeholder: "Module",
      controlType: "dropdown",
      selected: this.selectedModules,
      visible: true,
      selectMode: "multiple",
      showColumnHeader: true,
      showSearchRow: true,
      allowClear: true,
    }
  }

  public buildUserDataSource() {
    this.userDataSource = [
      {
        expanded: true,
        id: '1',
        name: 'Adams, Samuel'
      },
      {
        expanded: true,
        id: '2',
        name: 'Architect, Project'
      },
      {
        expanded: true,
        id: '3',
        name: 'Arregetti, Jake'
      },
      {
        expanded: true,
        id: '4',
        name: '	B, Kristin'
      }
    ];

    this.userDropdownData = {
      items: this.userDataSource,
      valueExpr: "name",
      displayExpr: "name",
      placeholder: "Users",
      controlType: "dropdown",
      selected: this.selectedUsers,
      visible: true,
      selectMode: "multiple",
      showColumnHeader: true,
      showSearchRow: true,
      allowClear: true,
    }
  }

  public buildGroupDataSource() {
    this.groupDataSource = [
      {
        expanded: true,
        id: '100',
        name: 'Acme Brands Portfolio'
      },
      {
        expanded: true,
        id: '101',
        name: 'Projects'
      },
      {
        expanded: true,
        id: '102',
        name: 'R_Portfolio'
      }
    ];

    this.groupDropdownData = {
      items: this.groupDataSource,
      valueExpr: "name",
      displayExpr: "name",
      placeholder: "Group",
      controlType: "dropdown",
      selected: this.selectedGroups,
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
      if (e.data[e.column.dataField] && e.data[e.column.dataField].toString().includes("View -")) {
        e.cellElement.style.backgroundColor = "#dff0d8"
      }

      if (e.data[e.column.dataField] && e.data[e.column.dataField].toString().includes("Delete -")) {
        e.cellElement.style.backgroundColor = "#f2dede"
      }

      if (e.data[e.column.dataField] && e.data[e.column.dataField].toString().includes("Block -")) {
        e.cellElement.style.backgroundColor = "#d9edf7"
      }
    }
  }

  public onModuleDropdownChange(e) {
    this.selectedModules = e;
  }

  public onUserDropdownChange(e) {
    this.selectedUsers = e;
  }

  public onGroupDropdownChange(e) {
    this.selectedGroups = e;
  }

  public setColumnContent() {
    const centerColumns = centerColumnsModel;
    const leaseColumns = leaseColumnsModel;
    const marketColumns = marketColumnsmodel;
    const storeColumns =  storeColumnsModel;
    this.selectedModules.forEach((module) => {
      const item = this.moduleDataSource.find((data) => {
        return data.id === module
      })
    })

    this.reportcolumns = {
      center: centerColumns,
      lease: leaseColumns,
      market: marketColumns,
      store: storeColumns
    }
    
    this.filterData();
  }

  public filterData() {
    const centerData = this.navigationRightsData.center.filter((data) => {
      return this.selectedUsers.includes(data.name) || this.selectedGroups.includes(data.name);
    });
    const leaseData = this.navigationRightsData.lease.filter((data) => {
      return this.selectedUsers.includes(data.name) || this.selectedGroups.includes(data.name);
    });
    const marketData = this.navigationRightsData.market.filter((data) => {
      return this.selectedUsers.includes(data.name) || this.selectedGroups.includes(data.name);
    });
    const storeData = this.navigationRightsData.store.filter((data) => {
      return this.selectedUsers.includes(data.name) || this.selectedGroups.includes(data.name);
    });

    this.filteredNavigationRightsData = {
      center: centerData,
      lease: leaseData,
      market: marketData,
      store: storeData
    }

    setTimeout(() => {
      this.isApplied = true;
      const dataGridArray = this.reportDataGrid.toArray()
      dataGridArray.forEach((grid) => {
        grid.instance.refresh();
      });
    }, 500)

  }

  public setTabcontent() {
    this.tabs = [];
    this.selectedModules.forEach((module) => {
      const item = this.moduleDataSource.find((data) => {
        return data.id === module
      })
      this.tabs.push({
        "title": item.name,
        "template": module,
        "id": module
      })
    })
    this.setColumnContent();
  }

  public getGroupAndUserNavigationRights() {
    this.navigationRightsData = this.service.getGroupAndUserNavigationRights();
  }

  public searchDataGrid(data) {
    const dataGridArray = this.reportDataGrid.toArray()
    dataGridArray.forEach((grid) => {
      grid.instance.searchByText(data);
    });
  }
  
  public apply() {
    this.isApplied = false;
    this.setTabcontent();
  }
  
  public exportDynamicGrids(e) {
		const workbook = new ExcelJS.Workbook();
		let sheets = this.reportDataGrid.toArray().length;
    let worksheetCount = 0;
    const setBackground = (gridCell, excelCell) => {
			if (gridCell.rowType === 'header') {
        excelCell.font.color = {argb: '00558E'}
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' }};
      }
			if (gridCell.rowType === 'data') {
        
				if (gridCell?.data && gridCell?.data[gridCell?.column.dataField]?.toString().includes("View -")) {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'dff0d8' }, bgColor: { argb: 'dff0d8' }};
        }
        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField]?.toString().includes("Block -")) {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd9edf7' }, bgColor: { argb: 'd9edf7' }};
        }
        if (gridCell?.data && gridCell?.data[gridCell?.column.dataField]?.toString().includes("Delete -")) {
					excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f2dede' }, bgColor: { argb: 'f2dede' }};
        }

			}
		}
    const navigationRightsSheet = workbook.addWorksheet('Navigation Rights')

    navigationRightsSheet.getRow(2).getCell(2).value = 'Navigation Rights';
    navigationRightsSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

    const dataGridArray = this.reportDataGrid.toArray()
    const exportDataGridCallback = (iteration, row) => {
      const dataLength = this.filteredNavigationRightsData?.[this.tabs[iteration]?.id]?.length
      if (iteration < this.tabs.length) {
        navigationRightsSheet.getRow(row).getCell(2).value = this.tabs[iteration]?.title;
        navigationRightsSheet.getRow(row).getCell(2).font = { bold: true, size: 16 };
        exportDataGrid({
          worksheet: navigationRightsSheet,
          component: dataGridArray[iteration].instance,
          topLeftCell: { row: row + 1, column: 2 },
          customizeCell: ({ gridCell, excelCell }) => {
            setBackground(gridCell, excelCell)
          }
        }).then(() => {
          row += dataLength + 5;
          exportDataGridCallback(iteration + 1, row)
        });
        
      } else {
        navigationRightsSheet.views = [
          {state: 'frozen', ySplit: 0, xSplit: 3}
        ];
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'MultipleGrids.xlsx');
        });
      }

    }
    exportDataGridCallback(0, 4);
  }
}