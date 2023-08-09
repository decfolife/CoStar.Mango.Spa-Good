import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Project } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'project-milestones-card',
	templateUrl: './project-milestones-card.component.html',
	styleUrls: ['./project-milestones-card.component.scss'],
	providers: [Service]
})
export class ProjectMilestonesCardComponent implements OnInit {

	projects : Project[];
	searchText : string = null;
	showMilestoneDates : Boolean = false;

	@ViewChild("ProjectMilestonesDataGrid") projectMilestonesDataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.projects = this.service.getProjects();
	}

	searchDataGrid(e) {
		this.projectMilestonesDataGrid.instance.searchByText(e);
	}

	exportDataGrid() {
		this.projectMilestonesDataGrid.instance.exportToExcel(false);
	}

}
