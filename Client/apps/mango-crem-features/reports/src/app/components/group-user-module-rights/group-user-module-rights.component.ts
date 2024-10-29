import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent, DxTreeViewComponent } from 'devextreme-angular';
import {
  EntityType,
  IdNamePair,
  ResolvedData,
} from '../../shared/models/index';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { GroupUserModuleRightsService } from './group-user-module-rights.service';
import { saveAs } from 'file-saver-es';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'mango-group-user-module-rights',
  templateUrl: './group-user-module-rights.component.html',
  styleUrls: ['./group-user-module-rights.component.scss'],
})
export class GroupUserModuleRightsComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public moduleListResolved: ResolvedData =
    this.route.snapshot.data['moduleList'];
  public userListResolved: ResolvedData = this.route.snapshot.data['userList'];
  public groupListResolved: ResolvedData =
    this.route.snapshot.data['groupList'];

  dateFormat: string = 'MM/dd/yyyy';

  userData: Array<any>;
  groupData: Array<any>;
  userList: any;
  groupList: any;
  groupColumns: Array<any>;
  userColumns: Array<any>;
  moduleDescriptionColumns: Array<any>;
  selectedModuleNames: Array<any> = [];
  selectedUsers: Array<any> = [];
  selectedGroups: Array<any> = [];
  treeDataSource: any;
  tabs: any;
  isApplied = false;
  dropdownData: any;
  moduleDescriptionData: any = [];
  dataGridLoading = true;

  @ViewChild(DxTreeViewComponent) treeView;
  @ViewChild('UserDataGrid') userDataGrid: DxDataGridComponent;
  @ViewChild('GroupDataGrid') groupDataGrid: DxDataGridComponent;
  @ViewChild('ModuleDescriptionGrid')
  moduleDescriptionGrid: DxDataGridComponent;
  @ViewChild('FilterDataGrid') filterDataGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  moduleList: IdNamePair[];
  errorMessage: any;

  constructor(
    public groupUserModuleRightsService: GroupUserModuleRightsService,
    private datepipe: DatePipe,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.moduleList = this.moduleListResolved.data;
    this.userList = this.userListResolved.data;
    this.groupList = this.groupListResolved.data;
    this.errorMessage = this.moduleListResolved.error;

    this.sharedService.getUserPreferences().subscribe((result) => {
      const userPreferences = result.data || {};
      this.dateFormat = userPreferences?.dateFormat || 'MM/dd/yyyy';
    });

    this.getGroupAndUserModuleRights();

    this.dropdownData = {
      items: this.moduleList,
      valueExpr: 'id',
      displayExpr: 'name',
      placeholder: 'Module',
      controlType: 'dropdown',
      visible: true,
      selectMode: 'multiple',
      showColumnHeader: true,
      showSearchRow: true,
      allowClear: true,
    };
  }

  public onCellPrepared(e) {
    if (e.rowType === 'data') {
      const header =
        e.column.dataField === 'name' ||
        e.column.dataField === 'securityLevel' ||
        e.column.dataField === 'company' ||
        e.column.dataField === 'primaryGroup';
      if (!header) {
        if (e.data[e.column.dataField] === 'Add' && !header) {
          // e.cellElement.style.backgroundColor = "#dff0d8"
          e.cellElement.classList.add('bg-success-lightest');
        }

        if (e.data[e.column.dataField] === 'Delete' && !header) {
          // e.cellElement.style.backgroundColor = "#f2dede"
          e.cellElement.classList.add('bg-danger-lightest');
        }

        if (e.data[e.column.dataField] === 'View' && !header) {
          // e.cellElement.style.backgroundColor = "#d9edf7"
          e.cellElement.classList.add('bg-info-lightest');
        }
      }
    }
  }

  public moduleDropdownChange(e) {
    if (this.selectedModuleNames !== e) {
      this.searchBox?.handleClear();
      this.selectedModuleNames = e;
      this.userData = null;
      this.groupData = null;
      this.isApplied = false;
    }
  }

  public setColumnContent() {
    this.userColumns = [
      {
        dataField: 'id',
        alignment: null,
        visible: true,
        dataType: 'number',
      },
      {
        dataField: 'name',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'securityLevel',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'company',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'primaryGroup',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
    ];

    this.groupColumns = [
      {
        dataField: 'id',
        alignment: null,
        visible: true,
        dataType: 'number',
      },
      {
        dataField: 'name',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
    ];

    this.selectedModuleNames.forEach((module) => {
      this.userColumns.push({
        dataField: module.id.toString(),
        alignment: null,
        caption: module.name,
        visible: true,
        dataType: 'string',
      });
      this.groupColumns.push({
        dataField: module.id.toString(),
        caption: module.name,
        alignment: null,
        visible: true,
        dataType: 'string',
      });
    });

    this.moduleDescriptionColumns = [
      {
        dataField: 'moduleDisplayName',
        caption: 'Module',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'objectTypeName',
        caption: 'Object',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'description',
        caption: 'Help Text',
        alignment: null,
        visible: true,
        dataType: 'string',
      },
    ];

    this.isApplied = true;
  }

  public getGroupAndUserModuleRights() {
    this.userData = this.groupUserModuleRightsService.getUserModuleRights();
    this.groupData = this.groupUserModuleRightsService.getGroupModuleRights();
  }

  public searchDataGrid(data) {
    this.userDataGrid?.instance?.searchByText(data);
    this.groupDataGrid?.instance?.searchByText(data);
    this.moduleDescriptionGrid?.instance?.searchByText(data);
  }

  public userDropdownChange(e) {
    if (e !== this.selectedUsers) {
      this.selectedUsers = e;
      this.userData = [];
    }
  }

  public groupDropdownChange(e) {
    if (e !== this.selectedGroups) {
      this.selectedGroups = e;
      this.groupData = [];
    }
  }

  public apply() {
    this.tabs = [];
    if (this.selectedUsers?.length) {
      this.tabs.push({ title: 'User Rights', template: 'userRights' });
    }

    if (this.selectedGroups?.length) {
      this.tabs.push({ title: 'Group Rights', template: 'groupRights' });
    }

    this.tabs.push({
      title: 'Module Description',
      template: 'moduleDescription',
    });

    this.setColumnContent();
    this.dataGridLoading = true;

    const selectedModules: number[] = [];
    this.selectedModuleNames.forEach((module) => {
      selectedModules.push(module.id);
    });

    const selectedGroups: number[] = [];
    this.selectedGroups.forEach((group) => {
      selectedGroups.push(group.id);
    });

    const selectedUsers: number[] = [];
    this.selectedUsers.forEach((user) => {
      selectedUsers.push(user.id);
    });

    this.groupUserModuleRightsService
      .getModuleRightData(selectedUsers, selectedGroups, selectedModules)
      .subscribe((result) => {
        const moduleData = result.data;
        this.userData = [];
        this.groupData = [];
        moduleData.forEach((data) => {
          if (data.entityTypeId === EntityType.User) {
            const index = this.userData.findIndex((item) => {
              return item.id === data.id;
            });
            if (index !== -1) {
              this.userData[index][data.moduleID] = data.securityType;
            } else {
              this.userData.push(data);
              this.userData[this.userData.length - 1][data.moduleID] =
                data.securityType;
            }
          } else {
            const index = this.groupData.findIndex((item) => {
              return item.id === data.id;
            });
            if (index !== -1) {
              this.groupData[index][data.moduleID] = data.securityType;
            } else {
              this.groupData.push(data);
              this.groupData[this.groupData.length - 1][data.moduleID] =
                data.securityType;
            }
          }
        });
        this.dataGridLoading = false;
      });

    this.groupUserModuleRightsService
      .getModuleDescriptionData([], [], selectedModules)
      .subscribe((result) => {
        this.moduleDescriptionData = result.data;
      });
  }

  public exportGrids(e) {
    const workbook = new ExcelJS.Workbook();
    let usersSheet;
    let groupsSheet;
    if (this.selectedUsers?.length) {
      usersSheet = workbook.addWorksheet('Users');
      usersSheet.getRow(2).getCell(2).value = 'Users';
      usersSheet.getRow(2).getCell(2).font = {
        bold: true,
        size: 16,
        underline: 'double',
      };
    }

    if (this.selectedGroups?.length) {
      groupsSheet = workbook.addWorksheet('Groups');
      groupsSheet.getRow(2).getCell(2).value = 'Groups';
      groupsSheet.getRow(2).getCell(2).font = {
        bold: true,
        size: 16,
        underline: 'double',
      };
    }
    const moduleDescriptionSheet = workbook.addWorksheet('Module Description');
    const filterSheet = workbook.addWorksheet('Filters');

    moduleDescriptionSheet.getRow(2).getCell(2).value = 'Module Description';
    moduleDescriptionSheet.getRow(2).getCell(2).font = {
      bold: true,
      size: 16,
      underline: 'double',
    };

    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' };
        excelCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'd2d2d2' },
          bgColor: { argb: 'd2d2d2' },
        };
      }

      const header =
        gridCell?.column?.dataField === 'name' ||
        gridCell?.column?.dataField === 'securityLevel' ||
        gridCell?.column?.dataField === 'company' ||
        gridCell?.column?.dataField === 'primaryGroup';
      if (gridCell.rowType === 'data' && !header) {
        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField] === 'Add'
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'dff0d8' },
            bgColor: { argb: 'dff0d8' },
          };
        }
        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField] === 'View'
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'd9edf7' },
            bgColor: { argb: 'd9edf7' },
          };
        }
        if (
          gridCell?.data &&
          gridCell?.data[gridCell?.column.dataField] === 'Delete'
        ) {
          excelCell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'f2dede' },
            bgColor: { argb: 'f2dede' },
          };
        }
      }
    };

    const userFilter = this.selectedUsers.map((user) => {
      return user.name;
    });
    const groupFilter = this.selectedGroups.map((group) => {
      return group.name;
    });

    filterSheet.getRow(2).getCell(2).value = 'Filters';
    filterSheet.getRow(2).getCell(2).font = {
      bold: true,
      size: 16,
      underline: 'double',
    };
    filterSheet.getRow(4).getCell(2).value = 'Users';
    filterSheet.getRow(4).getCell(2).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd2d2d2' },
      bgColor: { argb: 'd2d2d2' },
    };
    filterSheet.getRow(4).getCell(2).font = {
      bold: true,
      color: { argb: '00558E' },
    };
    filterSheet.getRow(4).getCell(3).value = 'Security Group';
    filterSheet.getRow(4).getCell(3).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd2d2d2' },
      bgColor: { argb: 'd2d2d2' },
    };
    filterSheet.getRow(4).getCell(3).font = {
      bold: true,
      color: { argb: '00558E' },
    };
    filterSheet.getRow(4).getCell(4).value = 'Module';
    filterSheet.getRow(4).getCell(4).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'd2d2d2' },
      bgColor: { argb: 'd2d2d2' },
    };
    filterSheet.getRow(4).getCell(4).font = {
      bold: true,
      color: { argb: '00558E' },
    };
    let userRow = 0;
    let groupRow = 0;
    let moduleRow = 0;
    let userRowWidth = 10;
    let groupRowWidth = 10;
    let moduleRowWidth = 10;

    userFilter.forEach((user) => {
      userRow++;
      filterSheet.getRow(4 + userRow).getCell(2).value = user;
      if (userRowWidth < user.length) {
        userRowWidth = user.length;
      }
    });
    groupFilter.forEach((group) => {
      groupRow++;
      filterSheet.getRow(4 + groupRow).getCell(3).value = group;
      if (groupRowWidth < group.length) {
        groupRowWidth = group.length;
      }
    });

    this.selectedModuleNames.forEach((module) => {
      moduleRow++;
      filterSheet.getRow(4 + moduleRow).getCell(4).value = module.name;
      if (moduleRowWidth < module.name.length) {
        moduleRowWidth = module.name.length;
      }
    });

    //autosize the width base on content
    filterSheet.columns[1].width = userRowWidth + 2;
    filterSheet.columns[2].width = groupRowWidth + 2;
    filterSheet.columns[3].width = moduleRowWidth + 2;

    if (this.selectedUsers?.length) {
      exportDataGrid({
        worksheet: usersSheet,
        component: this.userDataGrid.instance,
        topLeftCell: { row: 4, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          setBackground(gridCell, excelCell);
        },
      })
        .then(() => {
          if (this.selectedGroups?.length) {
            return exportDataGrid({
              worksheet: groupsSheet,
              component: this.groupDataGrid.instance,
              topLeftCell: { row: 4, column: 2 },
              customizeCell: ({ gridCell, excelCell }) => {
                setBackground(gridCell, excelCell);
              },
            });
          }
          return;
        })
        .then(() => {
          return exportDataGrid({
            worksheet: moduleDescriptionSheet,
            component: this.moduleDescriptionGrid?.instance,
            topLeftCell: { row: 4, column: 2 },
            customizeCell: ({ gridCell, excelCell }) => {
              setBackground(gridCell, excelCell);
            },
          });
        })
        .then(() => {
          return exportDataGrid({
            worksheet: filterSheet,
            component: this.filterDataGrid?.instance,
            topLeftCell: { row: 4, column: 2 },
          });
        })
        .then(() => {
          const date = this.getCurrentDate();
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: 'application/octet-stream' }),
              'Group and User Module Rights - ' + date + '.xlsx'
            );
          });
        });
    } else {
      exportDataGrid({
        worksheet: groupsSheet,
        component: this.groupDataGrid.instance,
        topLeftCell: { row: 4, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          setBackground(gridCell, excelCell);
        },
      })
        .then(() => {
          return exportDataGrid({
            worksheet: moduleDescriptionSheet,
            component: this.moduleDescriptionGrid?.instance,
            topLeftCell: { row: 4, column: 2 },
            customizeCell: ({ gridCell, excelCell }) => {
              setBackground(gridCell, excelCell);
            },
          });
        })
        .then(() => {
          return exportDataGrid({
            worksheet: filterSheet,
            component: this.filterDataGrid?.instance,
            topLeftCell: { row: 4, column: 2 },
          });
        })
        .then(() => {
          const date = this.getCurrentDate();
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(
              new Blob([buffer], { type: 'application/octet-stream' }),
              'Group and User Module Rights - ' + date + '.xlsx'
            );
          });
        });
    }
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }
}
