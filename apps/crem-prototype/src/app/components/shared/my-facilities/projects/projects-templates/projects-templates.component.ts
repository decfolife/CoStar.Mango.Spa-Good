import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ProjectTemplate } from '../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
  selector: 'projects-templates',
  templateUrl: './projects-templates.component.html',
  styleUrls: ['./projects-templates.component.scss']
})
export class ProjectsTemplatesComponent implements OnInit {

	templates : ProjectTemplate[];
 	isExpanded : Boolean = true;
 	queryName : String = '';
	queries : String[] = [];
	objectTemplates : String[] = [];

 	@ViewChild("TemplatesContainerDataGrid") dataGrid: DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.templates = this.service.getProjectTemplates();	
	}

	navigateToObject(event) {
		this.router.navigate(['../../template', event.data.id], {relativeTo: this.route } );
	} 	

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	showColumnChooser() {
		this.dataGrid.instance.showColumnChooser();
	}

	searchDataGrid(searchText) {
		this.dataGrid.instance.searchByText(searchText);
	}
}
