import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { MatDialog } from '@angular/material/dialog';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {AddServiceAccountComponent} from '../add-service-account/add-service-account.component';
import {ServiceAccountDetailsComponent} from '../service-account-details/service-account-details.component';
import {UpdateServiceAccountComponent} from '../update-service-account/update-service-account.component';
import { ClientDeliveryService } from '../../services/client-delivery.service';
import { saveAs } from 'file-saver-es';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'mango-service-accounts',
  templateUrl: './service-accounts.component.html',
  styleUrls: ['./service-accounts.component.scss'],
})
export class ServiceAccountsComponent implements OnInit {
  // public pageTitle = this.route.snapshot.data['pageTitle'];
  public pageTitle = 'Service Accounts';
  public serviceAccountsData: any;
  public allServiceAccountsData: any;
  public dropdownField: any;
  public columns: any;
  public selectedFilter: string = 'active';
  public dateFormat: string;
  public deleting = false;
  public searchText: string = '';

  faEllipsisH = faEllipsisH;
  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;

  constructor(
    private dialog: MatDialog,
    private datepipe: DatePipe,
    private service: ClientDeliveryService
    ) {}

  ngOnInit(): void {
    this.setDropdownItem();
    this.buildGridColumns();
    this.getServiceAccouts('active');
  }

  private getServiceAccouts(filter: string){
    this.service.getServiceAccounts(filter.toLowerCase())
    .subscribe(result => {        
      if(result && result.data){    
        this.allServiceAccountsData = result.data.items;      
        this.filterServiceAccountData(filter);  
        this.dataGrid.instance?.refresh();
      }
      setTimeout(() => {
        this.searchDataGrid(this.searchText);
      })
    })
  }

  public searchDataGrid(data: string): void {
    this.searchText = data;
    this.dataGrid?.instance?.searchByText(data);
  }

  private openServiceAccountDetailsComponentPopup(selectedRowData){
    let dialogRef = this.dialog.open(ServiceAccountDetailsComponent, {
      width: '1200px',
      panelClass: 'client-delivery-modal',
      data: selectedRowData
    });
  }

  public openAccountDetails(e): void {
    if (e.rowType != "header" && e.column.dataField !== "Actions") {
        this.openServiceAccountDetailsComponentPopup(e.data);      
    }
  }

  public onCellPrepared(e) {
    if (e.rowType == "data" && e.column.dataField === "Actions") {
      e.cellElement.className += " not-clickable";  
    }
  
    if (e.rowType === "header") {
      const ele = e.cellElement.querySelector(".dx-header-filter");
      if (ele) {
        setTimeout(() => {
          ele.addEventListener("click", () => {
            ele.setAttribute("aria-label", "Column Expanded");
            ele.setAttribute("aria-expanded", "true");
          });
        }, 150);
      }
    }
  }
  
  public onKeyDownOpenAccountDetails(e) {
    
    if (e.event.key === "Enter") {     
      const cellheader = e.event.currentTarget.classList;
      const result= cellheader.contains("dx-header-row");
      if(result) return;
      
      const focusedRowIndex = e.component.option("focusedRowIndex");      
      if(focusedRowIndex >= 0) {
        const visibleRows = e.component.getVisibleRows();
        const selRow = visibleRows[focusedRowIndex];
        const focusedColumnIndex = e.component.option("focusedColumnIndex");
        if(selRow && (selRow.rowType != "header" && selRow.cells[focusedColumnIndex].column.dataField !== "Actions"))
        {        
          this.openServiceAccountDetailsComponentPopup(selRow.data);
        }
      }     
    }
  }

  
  public onFilterChange(e: any[]): void {
    const filter: any = e?.[0]?.value || e?.[0] ;
    if (this.selectedFilter !== filter) {
      this.selectedFilter = filter;
      this.filterServiceAccountData(filter);
    }
  }

  private filterServiceAccountData(filter: string) {
    switch (filter.toLowerCase()) {
      case "active":
      {
        this.serviceAccountsData =  this.allServiceAccountsData.filter(x=>x.contactActive === true);
        break;
      }
      case "inactive":
        this.serviceAccountsData =  this.allServiceAccountsData.filter(x=>x.contactActive === false);
        break;
      default:
        this.serviceAccountsData =  this.allServiceAccountsData;
    }
  }

    public addServiceAccount(){    
      let dialogRef = this.dialog.open(AddServiceAccountComponent, {
        width: '460px',
        panelClass: 'client-delivery-modal',
        data: this.allServiceAccountsData.map(x => x.contactEmailAddress)
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.length > 0) {  
          this.service.addServiceAccount(result)             
          .subscribe(result => {
            if (result) { 
              if(!this.selectedFilter) this.selectedFilter = 'Active';
              setTimeout(() => { this.getServiceAccouts(this.selectedFilter) }, 500);           
            }
          });        
        }
      });   
  }

  public updateServiceAccountStatus(data, contactActiveFlg) {
    let dialogRef = this.dialog.open(UpdateServiceAccountComponent, {
      width: '600px',
      panelClass: 'client-delivery-modal',
      data: data.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const contactEmailAddress = result.contactEmailAddress;        
        this.service.updateServiceAccount(contactEmailAddress, result.contactId, contactActiveFlg)       
        .subscribe(response => {
          if(response) {  
            setTimeout(() => { this.getServiceAccouts(this.selectedFilter) }, 500);            
            this.searchDataGrid(this.searchText);
          }
        });
      }
    });
  }

  public exportGrids(): void {
    const workbook = new ExcelJS.Workbook();
    const serviceAccountMaintenanceSheet = workbook.addWorksheet('ServiceAccounts');

    serviceAccountMaintenanceSheet.getRow(2).getCell(2).value = 'ServiceAccounts';
    serviceAccountMaintenanceSheet.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };
    serviceAccountMaintenanceSheet.getRow(2).getCell(4).value = 'Filter:';
    serviceAccountMaintenanceSheet.getRow(2).getCell(4).font = { bold: true };
    serviceAccountMaintenanceSheet.getRow(2).getCell(5).value = this.selectedFilter;

    const setBackground = (gridCell, excelCell) => {
      if (gridCell.rowType === 'header') {
        excelCell.font.color = { argb: '00558E' }
        excelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'd2d2d2' }, bgColor: { argb: 'd2d2d2' } };
      }
    }

    exportDataGrid({
      worksheet: serviceAccountMaintenanceSheet,
      component: this.dataGrid.instance,
      topLeftCell: { row: 5, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setBackground(gridCell, excelCell)
      }
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        const date = this.getCurrentDate();
        const fileName = 'ServiceAccounts' + '_' + date + '.xlsx'
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
      });
    });
  }

  private setDropdownItem() {
    this.dropdownField = [
      {
          "value": "Active"
      },
      {
          "value": "Inactive"
      },
      {
          "value": "All"
      }
    ];
  }

  private buildGridColumns() {
    this.columns = [
			{	dataField : "contactId",
				alignment : "left",
				visible : true,
				dataType : "number",
				caption : "Contact ID"
			},
			{	dataField : "contactEmailAddress",
        caption : "Email",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "contactActive",
        caption : "Active",
				alignment : null,
				visible : true,
				dataType : null,
        cellTemplate:'contactActiveTemplate'
			},
		];
  }

  private getCurrentDate(): string {
    const date = new Date();
    return this.datepipe.transform(date, this.dateFormat);
  }

  public onContentReady(e) {
    setTimeout(() => {

      const gridADAElements = e.element.querySelectorAll(".dx-pager, .dx-datagrid-rowsview, .dx-page-size, .dx-button-disable, div.dx-page.dx-selection");
      if (gridADAElements !== null) {       
            gridADAElements.forEach((oElement, i) => {
              if(oElement.hasAttribute("role")) {
                oElement.removeAttribute("role");
              }       
              if(oElement.hasAttribute("aria-label")) {
                oElement.removeAttribute("aria-label");  
              }  
              if(oElement.hasAttribute("tabindex")) {
                oElement.removeAttribute("tabindex");
              }  
              if(oElement.hasAttribute("aria-current")) {
                oElement.removeAttribute("aria-current");
              }     
            });
      }
    });
  };
}
