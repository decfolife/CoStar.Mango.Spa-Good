import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, PortfolioProjectType } from '../../../../../../app.service';


@Component({
	selector: 'project-type',
	templateUrl: './project-type.component.html',
	styleUrls: ['./project-type.component.scss'],
	providers: [Service]
})
export class ProjectTypeComponent implements OnInit {

	projectTypeId : number;
	projectType : PortfolioProjectType;
	isVisible : Boolean = true;
	title : string;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		this.route.params.subscribe(params => { 
			this.projectTypeId = params['project_type_id']; 
			// console.log(this.projectTypeId);
			this.projectType = this.service.getProjectType(this.projectTypeId);
			this.title = this.projectType.projectType;
		}); 
	}

	ngOnInit() {
	}

	close(e) {
		// console.log("closing");
		this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );		
	}

	projectTypeSaved(e) {
		// console.log("saving");
		this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );
	}
}
