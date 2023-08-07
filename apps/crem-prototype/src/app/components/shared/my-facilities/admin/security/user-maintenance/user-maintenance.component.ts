import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, User, DropdownField } from '../../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'app-user-maintenance',
	templateUrl: './user-maintenance.component.html',
	styleUrls: ['./user-maintenance.component.scss'],
	providers: [Service]
})
export class UserMaintenanceComponent implements OnInit {

	columns : Array<any>;
	users : User[];
	userViews : DropdownField;
	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.users = this.service.getUsers();
		this.userViews = new DropdownField([{ value : "Active Log On" }, { value : "Inactive Log On" }, { value : "Contacts" }, { value : "All" }], "value", "value", "Select", "dropdown", ["Active Log On"], true, "single", false, false, false);		
		this.columns = [
			{	dataField : "id",
				alignment : "right",
				visible : true,
				dataType : "number",
				caption : "Contact ID"
			},
			{	dataField : "firstName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "lastName",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "email",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "company",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "primaryGroup",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "role",
				alignment : null,
				visible : true,
				dataType : null
			},
		];
		
	}

	searchDataGrid(data) {
		this.dataGrid.instance.searchByText(data);
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
