import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ProjectTaskSetting } from '../../../../../../../app.service';

@Component({
	selector: 'tasks-settings',
	templateUrl: './tasks-settings.component.html',
	styleUrls: ['./tasks-settings.component.scss'],
	providers: [Service]
})
export class TasksSettingsComponent implements OnInit {

	isVisible : Boolean = true;
	title : string = "Project Tasks Settings";
	projectId : Number;
	taskSettings : ProjectTaskSetting;
	calculateDatesBy : string[] = ['Work Days', 'Calendar Days'];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		this.route.parent.parent.params.subscribe(params => { 
			this.projectId = params['project_id']; 			
			this.taskSettings = this.service.getTaskSettingsByProject(this.projectId);
		});
	}

	ngOnInit() {
	}	

	close() {
		// console.log("closing");
		this.isVisible = false;
		this.router.navigate(['../'], {relativeTo: this.route } );		
	}

	save() {
		// console.log("saving");
		this.isVisible = false;
		this.router.navigate(['../'], {relativeTo: this.route } );		
	}

	handleToggleChange(e) {
		// console.log(e);
		this.taskSettings[e.source.name] = e.checked;
	}

}
