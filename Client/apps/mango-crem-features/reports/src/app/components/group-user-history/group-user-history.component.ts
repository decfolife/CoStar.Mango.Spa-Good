import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { EntityType, ResolvedData, UserPreferences } from '../../shared/models';
import { RightHistoryData } from './group-user-history.model';
import { GroupUserHistoryService } from './group-user-history.service';
import { DatePipe } from '@angular/common'
import { saveAs } from 'file-saver-es';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-group-user-history',
  templateUrl: './group-user-history.component.html',
  styleUrls: ['./group-user-history.component.scss']
})
export class GroupUserHistoryComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public userPreferencesResolved: ResolvedData = this.route.snapshot.data['userPreferences'];
  public userListResolved: ResolvedData = this.route.snapshot.data['userList'];
  public groupListResolved: ResolvedData = this.route.snapshot.data['groupList'];

  userPreferences: UserPreferences;
  userList: any;
  groupList: any;
  dateFormat: string;
  tabs: any;
  userRightHistoryData: RightHistoryData[] = [];
  groupRightHistoryData: RightHistoryData[] = [];
  userColumns: any[];
  groupColumns: any[];
  selectedUsers: any = [];
  selectedGroups: any = [];
  periodFrom: Date;
  periodTo: Date;
  isApplied = false;
  exporting = false;
  isPeriodFromValid = true;
  isPeriodToValid = true;

  @ViewChild('UserDataGrid') userDataGrid: DxDataGridComponent;
  @ViewChild('GroupDataGrid') groupDataGrid: DxDataGridComponent;
  @ViewChild('FilterDataGrid') filterDataGrid: DxDataGridComponent;
  @ViewChild('PeriodTo', { static: false }) PeriodToItem: DxFormComponent;
  @ViewChild('PeriodFrom', { static: false }) PeriodFromItem: DxFormComponent;

  constructor(
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private service: GroupUserHistoryService) {
  }

  ngOnInit(): void {
    this.tabs = [{ "title": "User History", "template": "userHistory" }, { "title": "Group History", "template": "groupHistory" }];
    this.userList = this.userListResolved.data;
    this.groupList = this.groupListResolved.data;
    const userPreferences = this.userPreferencesResolved.data || {};
    this.dateFormat = userPreferences?.dateFormat || "MM/dd/yyyy"
    this.setPeriodDates();
    this.getColumnContent();
  }

  public getColumnContent(): void {
 
    this.userColumns = [
      {
        dataField: "id",
        caption: "Id",
        alignment: null,
        visible: true,
        dataType: "number",
      },
      {
        dataField: "name",
        caption: "User",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "changeType",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "displayName",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "beforeChange",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "afterChange",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "description",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "lastModifiedDate",
        caption: "Last Modified",
        alignment: null,
        visible: true,
        dataType: "date",
        format: this.dateFormat
      },
      {
        dataField: "lastModifiedBy",
        alignment: null,
        visible: true,
        dataType: "string"
      }
    ];

    this.groupColumns = [
      {
        dataField: "id",
        caption: "Id",
        alignment: null,
        visible: true,
        dataType: "number",
      },
      {
        dataField: "name",
        caption: "Group",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "changeType",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "displayName",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "beforeChange",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "afterChange",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "description",
        alignment: null,
        visible: true,
        dataType: "string"
      },
      {
        dataField: "lastModifiedDate",
        caption: "Last Modified",
        alignment: null,
        visible: true,
        dataType: "date",
        format: this.dateFormat
      },
      {
        dataField: "lastModifiedBy",
        alignment: null,
        visible: true,
        dataType: "string"
      }
    ];
  }

  public userDropdownChange(e) {
    if (e !== this.selectedUsers) {
      this.selectedUsers = e;
      this.userRightHistoryData = [];
    }

  }

  public groupDropdownChange(e) {
    if (e !== this.selectedGroups) {
      this.selectedGroups = e;
      this.groupRightHistoryData = [];
    }
  }

  public searchDataGrid(data) {
    this.userDataGrid?.instance?.searchByText(data);
    this.groupDataGrid?.instance?.searchByText(data);
  }

  validatePeriodFrom = (event): boolean => {
    if (event.value <= this.periodTo) {
      this.isPeriodFromValid = true;
      return true;
    } else {
      this.isPeriodFromValid = false;
      return false;
    }
  }

  validatePeriodTo = (event): boolean => {
    if (event.value >= this.periodFrom) {
      this.isPeriodToValid = true;
      return true;
    } else {
      this.isPeriodToValid = false;
      return false;
    }
  }

  onPeriodFromChange = (event): void => {
    this.periodFrom = event.value;
    this.PeriodToItem.instance.validate();
		this.isApplied = false;
	}

	onPeriodToChange = (event): void => {
    this.periodTo = event.value;
    this.PeriodFromItem.instance.validate();
		this.isApplied = false;
  }

  public apply(): void {
    this.userRightHistoryData = null;
    this.groupRightHistoryData = null;
    this.tabs = [];
    if (this.selectedUsers?.length) {
      this.tabs.push(
        { "title": "User History", "template": "userHistory" }
      )
    }

    if (this.selectedGroups?.length) {
      this.tabs.push(
        { "title": "Group History", "template": "groupHistory" }
      )
    }
    this.isApplied = true;
    this.getHistoryRightsData();
  }

  private getHistoryRightsData(): void {
    const selectedUserIds = this.selectedUsers.map((user) => {
      return user.id;
    })
    const selectedGroupIds = this.selectedGroups.map((group) => {
      return group.id;
    })
    this.service.getRightHistoryData(selectedUserIds, selectedGroupIds, this.periodFrom, this.periodTo)
      .subscribe(result => {
        if (result.success) {
          this.userRightHistoryData = result?.data?.filter((item) => {
            return item.entityTypeId === EntityType.User;
          });
          this.groupRightHistoryData = result?.data?.filter((item) => {
            return item.entityTypeId === EntityType.Group;
          });
        } else {
          if (result.clientErrorMessage) {
            notify({
              message: result.clientErrorMessage,
              type: "error",
              displayTime: 600000,
              position: {
                at: 'bottom right',
                my: 'bottom right',
                offset: '-16 -16'
              },
              maxWidth: "450px",
              closeOnClick: true
            });
          }
          this.isApplied = false;
        }
      });
  }

  public addClassToDropdownBox(e) {
    const elements = document.getElementsByClassName('dx-overlay-content dx-popup-normal dx-resizable dx-popup-flex-height');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].querySelector('.reports-dropdown-box')) {
        elements[i].classList.add("reportsDropDown")
      }
    }
  }

  public exportGrids() {
    this.exporting = true;
    const workbook = new ExcelJS.Workbook();
    let usersSheet;
    let groupsSheet;
    if (this.selectedUsers?.length) {
      usersSheet = workbook.addWorksheet('Users');
      usersSheet.getRow(2).getCell(2).value = 'Users';
      usersSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    }

    if (this.selectedGroups?.length) {
      groupsSheet = workbook.addWorksheet('Groups');
      groupsSheet.getRow(2).getCell(2).value = 'Groups';
      groupsSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    }

    const filterSheet = workbook.addWorksheet('Filters');
    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' }
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
      }
    }

    const userFilter = this.selectedUsers.map((user) => {
      return user.name;
    })
    const groupFilter = this.selectedGroups.map((group) => {
      return group.name;
    })
    filterSheet.getRow(2).getCell(2).value = 'Filters';
    filterSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    filterSheet.getRow(4).getCell(4).value = 'Date Range';
    filterSheet.getRow(4).getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
    filterSheet.getRow(4).getCell(4).font = { bold: true, color: {argb: '00558E'} };
    filterSheet.getRow(4).getCell(2).value = 'Users';
    filterSheet.getRow(4).getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
    filterSheet.getRow(4).getCell(2).font = { bold: true, color: {argb: '00558E'} };
    filterSheet.getRow(4).getCell(3).value = 'Groups';
    filterSheet.getRow(4).getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
    filterSheet.getRow(4).getCell(3).font = { bold: true, color: {argb: '00558E'} };
    let userRow = 0;
    let groupRow = 0;
    let userRowWidth = 10;
    let groupRowWidth = 10;

    const transformedPeriodFrom = this.datepipe.transform(this.periodFrom, this.dateFormat);
    const transformedPeriodTo = this.datepipe.transform(this.periodTo, this.dateFormat);
    const combinedDate = transformedPeriodFrom + " To " + transformedPeriodTo;
    filterSheet.getRow(5).getCell(4).value = combinedDate;


    userFilter.forEach((user) => {
      userRow++;
      filterSheet.getRow(4 + userRow).getCell(2).value = user;
      if (userRowWidth < user?.length) {
        userRowWidth = user?.length
      }
    })
    groupFilter.forEach((group) => {
      groupRow++;
      filterSheet.getRow(4 + groupRow).getCell(3).value = group;
      if (groupRowWidth < group?.length) {
        groupRowWidth = group?.length
      }
    })

    //autosize the width base on content
    filterSheet.columns[3].width = combinedDate.length + 2;
    filterSheet.columns[1].width = userRowWidth + 2;
    filterSheet.columns[2].width = groupRowWidth + 2;

    if (this.selectedUsers?.length) {
      exportDataGrid({
        worksheet: usersSheet,
        component: this.userDataGrid.instance,
        topLeftCell: { row: 4, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          setBackground(gridCell, excelCell)
        }
      }).then(() => {
        if (groupsSheet) {
          return exportDataGrid({
            worksheet: groupsSheet,
            component: this.groupDataGrid.instance,
            topLeftCell: { row: 4, column: 2 },
            customizeCell: ({ gridCell, excelCell }) => {
              setBackground(gridCell, excelCell)
            }
          });
        }
        return;
        
      }).then(() => {
        return exportDataGrid({
          worksheet: filterSheet,
          component: this.filterDataGrid?.instance,
          topLeftCell: { row: 4, column: 2 }
        });
      }).then(() => {
        const date = this.getCurrentDate();
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Group and User History - ' + date +'.xlsx');
        });
        this.exporting = false;
      });
    } else {
      exportDataGrid({
        worksheet: groupsSheet,
        component: this.groupDataGrid.instance,
        topLeftCell: { row: 4, column: 2 },
        customizeCell: ({ gridCell, excelCell }) => {
          setBackground(gridCell, excelCell)
        }
      }).then(() => {
        return exportDataGrid({
          worksheet: filterSheet,
          component: this.filterDataGrid?.instance,
          topLeftCell: { row: 4, column: 2 }
        });
      }).then(() => {
        const date = this.getCurrentDate();
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Group and User History - ' + date +'.xlsx');
        });
        this.exporting = false;
      });
    }
  }
  
  private setPeriodDates(): void {
		this.periodTo = new Date();
		this.periodFrom = new Date();
		this.periodFrom.setDate(new Date().getDate() - 30);
		this.periodTo.setHours(23,59,59);
		this.periodFrom.setHours(0,0,0);
  }
  
  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }
}
