import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { UserDeletionComponent } from '../index/modal/user-deletion/user-deletion.component';
import { UserMaintenanceService } from './user-maintenance.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'user-maintenance',
  templateUrl: './user-maintenance.component.html',
  styleUrls: ['./user-maintenance.component.scss']
})
export class UserMaintenanceComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  public userMaintenanceData: any;
  public filteredUserMaintenanceData: any;
  public dropdownField: any;
  public dataGridLoading: false;
  public columns: any;
  public selectedFilter: string = "";
  public dateFormat: string;
  public deleting = false;
  public searchText: string = "";
  public userHaveAdminRights = false;
  public userFormId: number = 59; //default formID value.

  faEllipsisH = faEllipsisH;

  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;
  constructor(
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private dialog: MatDialog,
    private sharedService: SharedService,
    private service: UserMaintenanceService
    ) {}

  ngOnInit(): void {
    this.getUserPreference();
    this.getUserHaveAdminRights();
    this.onFilterChange(["Active Log On"])
    this.setDropdownItem();
    this.buildGridColumns();
    this.getUserFormId();
  }

  public getUserList(filter) {
    this.service.getUserList(filter)
      .subscribe(result => {
        this.userMaintenanceData = result.data;
        setTimeout(() => {
          this.searchDataGrid(this.searchText);
        })

      })
  }

  public getUserPreference() {
    this.sharedService.getUserPreferences()
    .subscribe(result => {
      this.dateFormat = result?.data?.dateFormat || "MM/DD/YYYY";
    })

  }

  public getUserHaveAdminRights() {
    this.service.getHasAdminLinkRights()
    .subscribe(result => {
      this.userHaveAdminRights = result.data;
    })
  }

  public getUserFormId() {
    this.service.getUserFormId()
    .subscribe(result => {
      this.userFormId = result.data;
    })
  }

  public searchDataGrid(data: string): void {
    this.searchText = data;
    this.dataGrid?.instance?.searchByText(data);
  }

  public onCellClicked(item): void {
    if (item.column.dataField !== "Actions") {
      this.edit(item.data.contactID)
    }
  }

  public onCellPrepared(e) {  
    if (e.rowType == "data" && e.column.dataField === "Actions") {
      e.cellElement.className += " not-clickable";  
    }
  }

  public onFilterChange(e: any[]): void {
    const selectedFilter: any = e?.[0]?.value || e?.[0] ;
    if (this.selectedFilter !== selectedFilter) {
      this.selectedFilter = selectedFilter;
      this.userMaintenanceData = null;
      switch (this.selectedFilter) {
        case "Active Log On":
          this.getUserList('active');
          break;

        case "Inactive Log On":
          this.getUserList('inactive');
          break;

        case "Contacts":
          this.getUserList('contacts');
          break;

        default:
          this.getUserList('all');
      }
    }
  }

  public exportGrids(): void {
    const workbook = new ExcelJS.Workbook();
    const userMaintenanceSheet = workbook.addWorksheet('Users');

    userMaintenanceSheet.getRow(2).getCell(2).value = 'Users';
    userMaintenanceSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    userMaintenanceSheet.getRow(2).getCell(4).value = 'Filter:';
    userMaintenanceSheet.getRow(2).getCell(4).font = { bold: true };
    userMaintenanceSheet.getRow(2).getCell(5).value = this.selectedFilter;

    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' }
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
      }
    }

    exportDataGrid({
      worksheet: userMaintenanceSheet,
      component: this.dataGrid.instance,
      topLeftCell: { row: 5, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setBackground(gridCell, excelCell)
      }
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        const date = this.getCurrentDate();
        const fileName = 'Users' + '_' + date + '.xlsx'
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
      });
    });
  }

  public addUser() {
    // route
    window.location.href = '/v06/Admin/Users/UserAdministrationPage.aspx?ContactID=undefined';
  }

  public view(userId) {
    // route
    window.location.href = '/v06/Forms/RenderForm.aspx?FID='+ this.userFormId.toString() +'&pgMode=view&OID=' + userId.toString() + '&OTID=5&OTTID=500&ROID=undefined&ROTID=undefined&RDID=undefined&POID=undefined&POTID=undefined&ParentFID=undefined';
  }

  public edit(userId) {
    // route
    window.location.href = '/v06/Admin/Users/UserAdministrationPage.aspx?ContactID=' + userId.toString();
  }

  public assignObjectRights(userId) {
    // route
    window.location.href = '/v06/Admin/SecurityMaintenance/SecurityMaintenance.aspx#/assignUserRights/5/' 
                            + userId.toString()
                            + '/UserMaintenanceWithNav.aspx';
    return false;
  }

  public assignGroups(userId) {
    // route
    window.location.href = '/v06/Admin/SecurityMaintenance/SecurityMaintenance.aspx#/assignGroups/5/' 
                            + userId.toString()
                            + '/UserMaintenanceWithNav.aspx';
    return false;
  }

  public assignModules(userId) {
    // route
    window.location.href = '/v06/Admin/SecurityMaintenance/SecurityMaintenance.aspx#/assignModules/5/' 
    + userId.toString()
    + '/UserMaintenanceWithNav.aspx';
    return false;
  }

  public assignAdminLinks(userId) {
    window.location.href = '/v06/admin/Users/UserAdminLinksNew.aspx?ContactID=' + userId.toString();
  }

  public deleteUser(data) {
    let dialogRef = this.dialog.open(UserDeletionComponent, {
      width: '400px',
      panelClass: 'user-maintenance-deletion-modal',
      data: data.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleting = true;
        this.service.deleteUser(result.contactID)      
        .subscribe(result => {
          this.deleting = false;
        });
        const index = this.userMaintenanceData.findIndex((item) => {
          return item.contactID.toString() === result?.contactID?.toString() && !item.isContact;
        });
  
        this.userMaintenanceData.splice(index, 1);
      }
    });
  }

  private buildGridColumns() {
    this.columns = [
			{	dataField : "contactID",
				alignment : "left",
				visible : true,
				dataType : "number",
				caption : "Contact ID"
			},
			{	dataField : "contactFirstName",
        caption : "First Name",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "contactLastName",
        caption : "Last Name",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "companyName",
        caption : "Company",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "primaryGroup",
        caption : "Primary Group",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "roleDesc",
        caption : "Role",
				alignment : null,
				visible : true,
				dataType : null
			},
		];
  }

  private setDropdownItem() {
    this.dropdownField = [
      {
          "value": "Active Log On"
      },
      {
          "value": "Inactive Log On"
      },
      {
          "value": "Contacts"
      },
      {
          "value": "All"
      }
    ];
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }
}
