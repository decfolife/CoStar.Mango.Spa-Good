import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Task } from '../../../../../../../app.service';

@Component({
	selector: 'task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	providers: [Service]
})
export class TaskComponent implements OnInit {

	taskId : number;
	task : Task;
	isVisible : Boolean = true;
	title : string;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 
		this.route.params.subscribe(params => { 
			this.taskId = params['task_id']; 

			this.task = this.service.getTask(this.taskId);
			this.title = this.task.step + ': ' + this.task.taskName;
		}); 
	}

	ngOnInit() {
	}

	close(e) {
		// console.log("closing");
		this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );		
	}

	taskSaved(e) {
		// console.log("saving");
		this.isVisible = false;
		this.router.navigate(['../../'], {relativeTo: this.route } );
	}

	transitionToTask(task_id) {
		// console.log("transitioning");
		this.router.navigate(['../', task_id], {relativeTo: this.route } );
	}

}
