import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Project, DropdownField } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'new-projects-card',
	templateUrl: './new-projects-card.component.html',
	styleUrls: ['./new-projects-card.component.scss'],
	providers: [Service]
})
export class NewProjectsCardComponent implements OnInit {

	newProjects : Project[];
	popoverVisible : Boolean = false;
	popoverTarget : string;
	hoveredRow : Project;
	durations : DropdownField;
	isExpanded : Boolean = false;
	
	@ViewChild("NewProjectsDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.newProjects = this.service.getNewProjects();	
		this.durations = new DropdownField([{ value : "Since last login" }, { value : "Last 30 days" }, { value : "Last 60 days" }, { value : "Last 90 days" }], "value", "value", "Select", "dropdown", ["Last 30 days"], true, "single", false, false, false);		
	}

	assignRowId(e) {
		// let self = this;
		// let rowId = "newProjectRow" + e.rowIndex.toString();
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
		this.popoverTarget = "#NewProjectInfo" + e.data.id.toString();
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
