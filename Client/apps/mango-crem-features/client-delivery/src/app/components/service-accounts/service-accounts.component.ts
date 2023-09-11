import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import 'regenerator-runtime/runtime';
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { MatDialog } from '@angular/material/dialog';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {AddServiceAccountComponent} from '../add-service-account/add-service-account.component';
import {ServiceAccountDetailsComponent} from '../service-account-details/service-account-details.component';
import {DeleteServiceAccountComponent} from '../delete-service-account/delete-service-account.component';
import { ClientDeliveryService } from '../../services/client-delivery.service';

@Component({
  selector: 'mango-service-accounts',
  templateUrl: './service-accounts.component.html',
  styleUrls: ['./service-accounts.component.scss'],
})
export class ServiceAccountsComponent implements OnInit {
  // public pageTitle = this.route.snapshot.data['pageTitle'];
  public pageTitle = 'Service Accounts';
  public serviceAccountsData: any;
  public dropdownField: any;
  // public dataGridLoading: false;
  public columns: any;
  public selectedFilter: string = 'all';
  // public dateFormat: string;
  public deleting = false;
  public searchText: string = '';

  faEllipsisH = faEllipsisH;
  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;

  constructor(
    private dialog: MatDialog,
    private service: ClientDeliveryService
    ) {}

  ngOnInit(): void {
    this.setDropdownItem();
    this.buildGridColumns();
    this.getServiceAccouts('all');
  }

  private getServiceAccouts(filter: string) {
    this.service.getServiceAccounts(filter)
      .subscribe(result => {
        // this.serviceAccountsData = result.data;
        this.serviceAccountsData = result;
        setTimeout(() => {
          this.searchDataGrid(this.searchText);
        })
      })
  }

  public searchDataGrid(data: string): void {
    this.searchText = data;
    this.dataGrid?.instance?.searchByText(data);
  }

  public onRowClicked(item): void {
    let dialogRef = this.dialog.open(ServiceAccountDetailsComponent, {
      width: '1200px',
      panelClass: 'client-delivery-modal',
      data: item.data
    });
  }

  public onFilterChange(e: any[]): void {
    const filter: any = e?.[0]?.value || e?.[0] ;
    if (this.selectedFilter !== filter) {
      this.selectedFilter = filter;
      this.serviceAccountsData = null;
      switch (this.selectedFilter) {
        case "Active":
          this.getServiceAccouts('active');
          break;
        case "Inactive":
          this.getServiceAccouts('inactive');
          break;
        default:
          this.getServiceAccouts('all');
      }
    }
  }

  public deleteServiceAccount(data) {
    let dialogRef = this.dialog.open(DeleteServiceAccountComponent, {
      width: '600px',
      panelClass: 'client-delivery-modal',
      data: data.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const contactId = result.contactID;
        //TODO: clean code when integrate API call with real data
        // this.service.deleteServiceAccount(contactId, this.selectedFilter)   
        this.service.deleteServiceAccount(this.serviceAccountsData, contactId, this.selectedFilter)       
        .subscribe(response => {
          if(response) {
            this.serviceAccountsData = response;
            this.searchDataGrid(this.searchText);
          }
        });
      }
    });
  }

  public addServiceAccount(){
    let dialogRef = this.dialog.open(AddServiceAccountComponent, {
      width: '600px',
      panelClass: 'client-delivery-modal',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.length > 0) {
        this.service.addServiceAccount(result)      
        .subscribe(result => {
          if (result) {
            this.serviceAccountsData.push(result);
          }
        });
      }
    });
  }

  public exportGrids() {

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
			{	dataField : "contactID",
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
			{	dataField : "isActive",
        caption : "Active",
				alignment : null,
				visible : true,
				dataType : null
			},
		];
  }

}
