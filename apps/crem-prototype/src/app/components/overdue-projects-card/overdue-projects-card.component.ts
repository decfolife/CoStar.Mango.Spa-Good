import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Project } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'overdue-projects-card',
	templateUrl: './overdue-projects-card.component.html',
	styleUrls: ['./overdue-projects-card.component.scss'],
	providers: [Service]
})
export class OverdueProjectsCardComponent implements OnInit {

	overdueProjects : Project[];
	popoverVisible : Boolean = false;
	popoverTarget : string;
	hoveredRow : Project;
	isExpanded : Boolean = false;
	
	@ViewChild("OverdueProjectsDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.overdueProjects = this.service.getOverdueProjects();	
	}

	assignRowId(e) {
		// let self = this;
		// let rowId = "overdueProjectRow" + e.rowIndex.toString();
		// if( e.rowType == "data") {
		// 	e.rowElement.id = rowId;
		// 	e.rowElement.addEventListener("mouseover", function() {
		// 		self.popoverTarget = "#" + rowId
		// 		self.popoverVisible = true;
		// 		self.hoveredRow = e.data;
		// 	} , false);
		// 	e.rowElement.addEventListener("mouseout", function() {
		// 		self.popoverVisible = false;
		// 	}, false);
		// }		
	}

	showPopover(e) {
		this.popoverTarget = "#OverdueProjectInfo" + e.data.id.toString();
		this.popoverVisible = true;
		this.hoveredRow = e.data;
	}

	hidePopover() {
		this.popoverVisible = false;
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}


}
