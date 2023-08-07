import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease, DropdownField } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'new-leases-card',
	templateUrl: './new-leases-card.component.html',
	styleUrls: ['./new-leases-card.component.scss'],
	providers: [Service]
})
export class NewLeasesCardComponent implements OnInit {

	newLeases : Lease[];
	durations : DropdownField;
	isExpanded : Boolean = false;
	@ViewChild("NewLeasesDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.newLeases = this.service.getNewLeases();	
		this.durations = new DropdownField([{ value : "Since last login" }, { value : "Last 30 days" }, { value : "Last 60 days" }, { value : "Last 90 days" }], "value", "value", "Select", "dropdown", ["Last 30 days"], true, "single", false, false, false);		
	}	

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
