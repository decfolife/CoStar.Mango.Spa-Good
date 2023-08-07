import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task } from '../../../../../../../app.service';

@Component({
	selector: 'quick-approval',
	templateUrl: './quick-approval.component.html',
	styleUrls: ['./quick-approval.component.scss'],
	providers: [Service]
})
export class QuickApprovalComponent implements OnInit {
	
	isVisible : Boolean = true;
	title : string = "Quick Approval";
	startEditAction: string = "click";
	myTasks : Task[];
	projectId : Number;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 

		this.route.parent.parent.params.subscribe(params => { 
			this.projectId = params['project_id']; 			
			this.myTasks = this.service.getTasksByProject(this.projectId).filter(itm => itm.completeDate == null);
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

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
    } 

}
