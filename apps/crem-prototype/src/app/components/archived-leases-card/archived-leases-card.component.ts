import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Lease, DropdownField } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'archived-leases-card',
	templateUrl: './archived-leases-card.component.html',
	styleUrls: ['./archived-leases-card.component.scss'],
	providers: [Service]
})
export class ArchivedLeasesCardComponent implements OnInit {

	archivedLeases : Lease[];
	durations : DropdownField;
	isExpanded : Boolean = false;
	@ViewChild("ArchiveLeasesDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.archivedLeases = this.service.getRecentlyArchivedLeases();	
		this.durations = new DropdownField([{ value : "Since last login" }, { value : "Last 30 days" }, { value : "Last 60 days" }, { value : "Last 90 days" }], "value", "value", "Select", "dropdown", ["Last 30 days"], true, "single", false, false, false);		
	}	

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}


}
