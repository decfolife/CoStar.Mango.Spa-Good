import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Transaction, DropdownField } from '../../../../../app.service';


@Component({
	selector: 'projects-board',
	templateUrl: './projects-board.component.html',
	styleUrls: ['./projects-board.component.scss'],
	providers: [Service]
})
export class ProjectsBoardComponent implements OnInit {

	clientFilter : DropdownField;
	clients : any = [];
	selectedClient : String;

	projectTypeFilter : DropdownField;
	projectTypes : any = [];
	selectedProjectType : String;

	projectManagerFilter : DropdownField;
	projectManagers : any = [];
	selectedProjectManagers : String[] = [];

	showNewActivity : Boolean = false;
	data : any;
	filteredData : any;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) {
	}

	ngOnInit() {
		this.clients = this.service.getTransactionDistinctClients();		
		// console.log(this.clients);
		this.clientFilter = new DropdownField(this.clients, "client", "client", "Portfolio", "dropdown", [], true, "single", true, true, true);	
		this.projectTypeFilter = new DropdownField(this.projectTypes, "type", "type", "Project Type", "dropdown", [], true, "single", true, true, true);
		this.projectManagerFilter = new DropdownField(this.projectManagers, "manager", "manager", "Project Manager", "dropdown", [], true, "multiple", true, true, true);
	}

	selectedClientChanged(e) {
		// console.log(e);
		this.selectedClient = e[0];
		this.projectTypes = this.service.getTransactionDistinctProjectTypesByClient(this.selectedClient);
		this.projectTypeFilter = new DropdownField(this.projectTypes, "type", "type", "Project Type", "dropdown", [], true, "single", true, true, true);
		this.projectManagers = this.service.getTransactionDistinctProjectManagersByClient(this.selectedClient);
		this.projectManagerFilter = new DropdownField(this.projectManagers, "manager", "manager", "Project Manager", "dropdown", [], true, "multiple", true, true, true);
		this.selectedProjectType = null;
		this.data = null;
		this.filteredData = null;
	}

	selectedProjectTypeChanged(e) {
		// console.log(e);
		this.selectedProjectType = e[0];
		this.data = null;
		this.filteredData = null;
	}

	searchProjects(searchText) {		
		// Filter by project name, project manager, and internalID
		if( searchText.length ) {
			let filt = searchText.toUpperCase();
			this.filteredData.forEach((phase, index) => {
				phase.projects = this.data[index].projects.filter(itm => itm.name.toUpperCase().includes(filt) || itm.manager.toUpperCase().includes(filt) || itm.internalId.toUpperCase().includes(filt) );
			});
		} else {
			console.log("I'm in the else clause");
			console.log(this.data);
			this.filteredData = this.data;
		}		
	}

	apply() {
		// Get the project data from the service
		this.data = this.service.getTransactionsForBoard(this.selectedClient, this.selectedProjectType, this.selectedProjectManagers);
		this.filteredData = this.data;
		// console.log(this.data);	
	}

	add() {
		this.router.navigate(['../add'], {relativeTo: this.route } );	
	}

	onTaskDragStart(e) {
		e.itemData = e.fromData[e.fromIndex];
	}
	
	onTaskDrop(e) {
		e.fromData.splice(e.fromIndex, 1);
		e.toData.splice(e.toIndex, 0, e.itemData);
	}

	selectedProjectManagersChanged(e) {
		console.log(e);
		this.selectedProjectManagers = e;		
	}

	filterByNewActivity(e) {

	}
}
