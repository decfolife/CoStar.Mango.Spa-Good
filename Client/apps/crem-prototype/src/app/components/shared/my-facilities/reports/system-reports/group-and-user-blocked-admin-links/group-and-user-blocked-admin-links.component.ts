import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from '../../../../../../app.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'group-and-user-blocked-admin-links',
  templateUrl: './group-and-user-blocked-admin-links.component.html',
  styleUrls: ['./group-and-user-blocked-admin-links.component.scss']
})
export class GroupAndUserBlockedAdminLinksComponent implements OnInit {

  data : Array<any>;
  columns : Array<any>;

  @ViewChild("DataGrid") dataGrid: DxDataGridComponent;

  constructor(
    public service : Service
  ) { }

  ngOnInit() {
    this.getColumnContent();
    this.getUserBlockedAdminLinks();
  }

  public onContentReady(event) {

  }

  public getColumnContent() {
    this.columns = [
			{	dataField : "type",
				alignment : "left",
				caption : "Group/User",
				visible : true,
        dataType : "string",
        groupIndex : 1
			},
			{	dataField : "id",
				alignment : null,
				visible : true,
				dataType : "number"
			},
			{	dataField : "name",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{
				dataField : "adminSection",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "adminLink",
				alignment : null,
				visible : true,
				dataType : "string"
			},			
			{	dataField : "lastModifiedBy",
				alignment : null,
				visible : true,
				dataType : "string"
			},
			{	dataField : "lastModified",
				alignment : null,
				visible : true,
				dataType : "date"
			}			
		];
  }

  public getUserBlockedAdminLinks() {
    this.data = this.service.getUserBlockedAdminLinks();
  }

  public searchDataGrid(data) {
		this.dataGrid.instance.searchByText(data);
  }
  
  public exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
  }
  

}
