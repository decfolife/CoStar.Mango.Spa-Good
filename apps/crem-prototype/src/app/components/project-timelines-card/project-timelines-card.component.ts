import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, GanttTask, Dependency, Resource, ResourceAssignment } from '../../app.service';

@Component({
	selector: 'project-timelines-card',
	templateUrl: './project-timelines-card.component.html',
	styleUrls: ['./project-timelines-card.component.scss'],
	providers: [Service]
})
export class ProjectTimelinesCardComponent implements OnInit {

	// Gantt Chart Stuff
	ganttTasks : GanttTask[];
	dependencies : Dependency[];
	resources : Resource[];
	resourceAssignments : ResourceAssignment[];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		// Gantt Chart Stuff
		this.ganttTasks = this.service.getProjectTimelineGanttTasks();
		this.dependencies = this.service.getProjectTimelineDependencies();
		this.resources = this.service.getResources();
		this.resourceAssignments = this.service.getProjectTimelineResourceAssignments();
	}

}
